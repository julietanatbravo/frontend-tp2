/* =========================================================
   Generador del árbol de componentes
   Lee los .jsx desde App.jsx, detecta qué componentes propios
   renderiza cada uno y guarda el árbol en src/data/componentTree.json.
   Se ejecuta como plugin de Vite: al iniciar `npm run dev` / `npm run build`
   y cada vez que cambia un .jsx en desarrollo.
   ========================================================= */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from '@babel/parser'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const ENTRY = path.join(ROOT, 'src/App.jsx')
const OUTPUT = path.join(ROOT, 'src/data/componentTree.json')

// Contexto en el que aparece un componente dentro del JSX de su padre
const BASE_CTX = { conditional: false, repeated: false }

// Los componentes de React empiezan con mayúscula; las etiquetas HTML no
const isComponentName = (name) => /^[A-Z]/.test(name ?? '')

const relative = (file) => path.relative(ROOT, file).split(path.sep).join('/')

function kindOf(file) {
  const rel = relative(file)
  if (file === ENTRY) return 'principal'
  if (rel.startsWith('src/pages/')) return 'pagina'
  if (rel.startsWith('src/components/layout/')) return 'layout'
  if (rel.startsWith('src/components/ui/')) return 'base'
  return 'componente'
}

function createAnalyzer() {
  // Cada archivo se lee y analiza una sola vez por generación
  const files = new Map()

  // Solo interesan los imports de archivos .jsx propios (no librerías ni JSON)
  function resolveImport(fromFile, source) {
    if (!source.startsWith('.')) return null
    const base = path.resolve(path.dirname(fromFile), source)
    const candidates = [base, `${base}.jsx`, path.join(base, 'index.jsx')]
    return candidates.find((c) => c.endsWith('.jsx') && fs.existsSync(c)) ?? null
  }

  function analyzeFile(file) {
    if (files.has(file)) return files.get(file)

    const ast = parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx'] })
    const imports = new Map() // nombre local → { file, name }
    const components = new Map() // nombre → función del componente
    let defaultExport = null

    for (const node of ast.program.body) {
      if (node.type === 'ImportDeclaration') {
        const target = resolveImport(file, node.source.value)
        if (!target) continue
        for (const spec of node.specifiers) {
          if (spec.type === 'ImportDefaultSpecifier') imports.set(spec.local.name, { file: target, name: 'default' })
          if (spec.type === 'ImportSpecifier') imports.set(spec.local.name, { file: target, name: spec.imported.name })
        }
        continue
      }

      if (node.type === 'ExportDefaultDeclaration') {
        defaultExport = node.declaration.type === 'Identifier' ? node.declaration.name : node.declaration.id?.name
      }

      // function Foo() {} · export function Foo() {} · const Foo = () => {}
      const decl = node.type.startsWith('Export') ? node.declaration : node
      if (decl?.type === 'FunctionDeclaration' && isComponentName(decl.id?.name)) {
        components.set(decl.id.name, decl)
      }
      if (decl?.type === 'VariableDeclaration') {
        for (const d of decl.declarations) {
          if (isComponentName(d.id.name) && d.init?.type.includes('Function')) components.set(d.id.name, d.init)
        }
      }
    }

    const info = { imports, components, defaultExport }
    files.set(file, info)
    return info
  }

  // ¿El nombre usado en el JSX de `file` es un componente propio? Devuelve dónde está definido
  function resolveComponent(file, name) {
    const info = analyzeFile(file)
    if (info.components.has(name)) return { file, name }

    const imported = info.imports.get(name)
    if (!imported) return null
    const target = analyzeFile(imported.file)
    const targetName = imported.name === 'default' ? target.defaultExport : imported.name
    return target.components.has(targetName) ? { file: imported.file, name: targetName } : null
  }

  // Hijos de un nodo del AST, sin metadatos
  function childNodes(node) {
    const skip = new Set(['type', 'loc', 'start', 'end', 'extra', 'leadingComments', 'trailingComments', 'innerComments'])
    return Object.entries(node)
      .filter(([key]) => !skip.has(key))
      .flatMap(([, value]) => (Array.isArray(value) ? value : [value]))
      .filter((value) => value && typeof value.type === 'string')
  }

  // Recorre el AST y junta los componentes propios que se renderizan.
  // Devuelve "usos": { ref, conditional, repeated, route?, nested: usos dentro de sus children }
  function collect(node, ctx, file) {
    if (!node || typeof node.type !== 'string') return []
    const all = (nodes, c = ctx) => nodes.flatMap((n) => collect(n, c, file))
    const conditional = { ...ctx, conditional: true }

    switch (node.type) {
      case 'JSXElement':
        return collectElement(node, ctx, file)
      // cond ? <A /> : <B />
      case 'ConditionalExpression':
        return [...collect(node.test, ctx, file), ...all([node.consequent, node.alternate], conditional)]
      // cond && <A />
      case 'LogicalExpression':
        return [...collect(node.left, ctx, file), ...collect(node.right, conditional, file)]
      // if (cond) return <A />
      case 'IfStatement':
        return [...collect(node.test, ctx, file), ...all([node.consequent, node.alternate].filter(Boolean), conditional)]
      // lista.map((item) => <A />)
      case 'CallExpression':
        if (node.callee.type === 'MemberExpression' && node.callee.property.name === 'map') {
          return [...collect(node.callee, ctx, file), ...all(node.arguments, { ...ctx, repeated: true })]
        }
        break
    }
    return all(childNodes(node))
  }

  function collectElement(node, ctx, file) {
    const { name, type } = node.openingElement.name
    const elementName = type === 'JSXIdentifier' ? name : null
    const parts = [...node.openingElement.attributes, ...node.children]

    if (elementName === 'Route') return collectRoute(node, ctx, file)

    const ref = elementName && resolveComponent(file, elementName)
    // Etiqueta HTML o componente de una librería: se sigue buscando adentro
    if (!ref) return parts.flatMap((n) => collect(n, ctx, file))

    // Lo que se le pasa como children o props se renderiza dentro de este componente
    const nested = parts.flatMap((n) => collect(n, BASE_CTX, file))
    return [{ ref, ...ctx, nested }]
  }

  // <Route path="x" element={<Página />}>: la página cuelga de la ruta padre (su <Outlet />)
  function collectRoute(node, ctx, file) {
    const attr = (attrName) =>
      node.openingElement.attributes.find((a) => a.type === 'JSXAttribute' && a.name.name === attrName)

    const elementAttr = attr('element')
    const elementUsages = elementAttr ? collect(elementAttr.value, ctx, file) : []
    const childRoutes = node.children.flatMap((n) => collect(n, BASE_CTX, file))

    if (elementUsages.length !== 1) return [...elementUsages, ...childRoutes]

    const [usage] = elementUsages
    const pathValue = attr('path')?.value?.value
    if (attr('index')) usage.route = '/'
    else if (pathValue) usage.route = pathValue === '*' ? '*' : `/${pathValue}`
    usage.nested.push(...childRoutes)
    return [usage]
  }

  return { analyzeFile, collect }
}

// Junta los usos repetidos del mismo componente en un mismo padre (ej. dos PokemonCard)
function groupUsages(usages) {
  const groups = new Map()
  for (const usage of usages) {
    const key = `${usage.ref.file}#${usage.ref.name}`
    const group = groups.get(key)
    if (!group) {
      groups.set(key, { ...usage, nested: [...usage.nested], count: 1 })
    } else {
      group.count++
      group.conditional &&= usage.conditional
      group.repeated ||= usage.repeated
      group.route ??= usage.route
      group.nested.push(...usage.nested)
    }
  }
  return [...groups.values()]
}

export function generateComponentTree() {
  const { analyzeFile, collect } = createAnalyzer()

  function buildNode(usage, ancestors) {
    const { file, name } = usage.ref
    const key = `${file}#${name}`
    const node = { name, file: relative(file), kind: kindOf(file) }
    if (usage.route) node.route = usage.route
    if (usage.count > 1) node.count = usage.count
    if (usage.conditional) node.conditional = true
    if (usage.repeated) node.repeated = true

    // Un componente que se renderiza a sí mismo (ej. TreeNode) se marca y no se expande
    if (ancestors.has(key)) return { ...node, recursive: true, children: [] }

    const definition = analyzeFile(file).components.get(name)
    const own = collect(definition.body, BASE_CTX, file)
    const next = new Set(ancestors).add(key)
    node.children = groupUsages([...own, ...usage.nested]).map((child) => buildNode(child, next))
    return node
  }

  const app = { file: ENTRY, name: analyzeFile(ENTRY).defaultExport }
  return buildNode({ ref: app, ...BASE_CTX, nested: [], count: 1 }, new Set())
}

// Escribe el JSON solo si cambió, para no disparar recargas de más
export function writeComponentTree() {
  const json = `${JSON.stringify(generateComponentTree(), null, 2)}\n`
  const previous = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : null
  if (json !== previous) fs.writeFileSync(OUTPUT, json)
}

export function componentTreePlugin() {
  return {
    name: 'component-tree',
    buildStart() {
      writeComponentTree()
    },
    // En desarrollo se regenera al guardar un componente
    handleHotUpdate({ file }) {
      if (!file.endsWith('.jsx')) return
      try {
        writeComponentTree()
      } catch (error) {
        // Un archivo a medio escribir puede no parsear: se avisa y se espera al próximo guardado
        console.warn(`[component-tree] No se pudo regenerar el árbol: ${error.message}`)
      }
    },
  }
}
