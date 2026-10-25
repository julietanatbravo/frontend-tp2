import { Link } from 'react-router'
import Card from '../ui/Card'

function SectionCard({ seccion }) {
  return (
    <Card as={Link} to={seccion.to} hover className="group flex h-full flex-col">
      <span className="text-h2" aria-hidden="true">
        {seccion.icon}
      </span>
      <h3 className="mt-2 text-xl text-fg">{seccion.label}</h3>
      <p className="mt-1 flex-1 text-fg-muted">{seccion.descripcion}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-bold text-primary">
        Entrar
        <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </span>
    </Card>
  )
}

export default SectionCard
