import { Link } from 'react-router'
import equipo from '../../data/equipo.json'

function Brand({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2 text-primary">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <span className="grid leading-tight">
        <span className="font-display text-lg font-semibold">{equipo.nombre}</span>
        <span className="text-small text-fg-muted">{equipo.bajada}</span>
      </span>
    </Link>
  )
}

export default Brand
