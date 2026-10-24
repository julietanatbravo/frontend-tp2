import { COMPONENT_KINDS } from '../../utils/componentKinds'

function NodeLabel({ node }) {
  const kind = COMPONENT_KINDS[node.kind]

  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 py-1">
      <span className={`badge ${kind.className}`} title={kind.label}>
        {node.name}
      </span>
      {node.route && <span className="code">{node.route}</span>}
      {node.count && <span className="text-small font-bold text-fg-muted">×{node.count}</span>}
      {node.conditional && <span className="text-small text-fg-muted" title="Se muestra solo en ciertos casos">🔀 condicional</span>}
      {node.repeated && <span className="text-small text-fg-muted" title="Se renderiza una vez por cada elemento de una lista">🔁 en lista</span>}
      {node.recursive && <span className="text-small text-fg-muted" title="Se renderiza a sí mismo">↺ recursivo</span>}
      <span className="hidden text-small text-fg-muted/70 sm:inline">{node.file}</span>
    </span>
  )
}

// Cada nodo con hijos es un desplegable; los dos primeros niveles arrancan abiertos
function TreeNode({ node, depth = 0 }) {
  if (node.children.length === 0) {
    return (
      <li className="pl-6">
        <NodeLabel node={node} />
      </li>
    )
  }

  return (
    <li>
      <details open={depth < 2}>
        <summary className="flex cursor-pointer list-none items-start gap-1 rounded-card hover:bg-surface [&::-webkit-details-marker]:hidden">
          <span
            className="mt-1.5 w-5 shrink-0 text-center text-fg-muted transition-transform [details[open]>summary>&]:rotate-90"
            aria-hidden="true"
          >
            ▸
          </span>
          <NodeLabel node={node} />
        </summary>
        <ul className="ml-2.5 grid gap-0.5 border-l-2 border-border pl-3">
          {node.children.map((child) => (
            <TreeNode key={`${child.file}#${child.name}`} node={child} depth={depth + 1} />
          ))}
        </ul>
      </details>
    </li>
  )
}

export default TreeNode
