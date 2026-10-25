import { Link } from 'react-router'
import equipo from '../../data/equipo.json'
import Logo from '../illustrations/Logo'

function Brand({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2 text-primary">
      <Logo className="size-9 shrink-0" />
      <span className="grid leading-tight">
        <span className="font-display text-lg font-semibold">{equipo.nombre}</span>
        <span className="text-small text-fg-muted">{equipo.bajada}</span>
      </span>
    </Link>
  )
}

export default Brand
