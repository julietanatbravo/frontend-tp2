import { COMPONENT_KINDS } from '../../utils/componentKinds'

const MARKERS = [
  { symbol: '/ruta', description: 'Página que se muestra en esa dirección', code: true },
  { symbol: '×N', description: 'Se usa N veces dentro del mismo padre' },
  { symbol: '🔀 condicional', description: 'Se muestra solo en ciertos casos' },
  { symbol: '🔁 en lista', description: 'Se repite por cada elemento de una lista' },
  { symbol: '↺ recursivo', description: 'Se renderiza a sí mismo' },
]

function TreeLegend() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <p className="mb-2 text-small font-bold uppercase tracking-widest text-fg-muted">Tipos</p>
        <ul className="flex flex-wrap gap-2">
          {Object.entries(COMPONENT_KINDS).map(([id, kind]) => (
            <li key={id}>
              <span className={`badge ${kind.className}`}>{kind.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-2 text-small font-bold uppercase tracking-widest text-fg-muted">Marcas</p>
        <ul className="grid gap-1 text-small">
          {MARKERS.map((marker) => (
            <li key={marker.symbol}>
              <span className={marker.code ? 'code' : 'font-bold'}>{marker.symbol}</span>{' '}
              <span className="text-fg-muted">{marker.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TreeLegend
