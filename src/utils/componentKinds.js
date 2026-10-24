// Tipos de componente del árbol (los asigna scripts/component-tree.js según la carpeta)
export const COMPONENT_KINDS = {
  principal: { label: 'Principal', className: 'bg-primary text-primary-fg' },
  layout: { label: 'Layout', className: 'bg-secondary text-night' },
  pagina: { label: 'Página', className: 'bg-accent text-accent-fg' },
  componente: { label: 'Componente', className: 'bg-primary-soft text-fg' },
  base: { label: 'Base (UI)', className: 'bg-surface text-fg-muted border border-border' },
}
