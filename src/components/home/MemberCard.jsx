import { Link } from 'react-router'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

// featured: versión horizontal y grande, para cuando hay un solo integrante
function MemberCard({ integrante, featured = false }) {
  return (
    <Card
      as={Link}
      to={`/integrantes/${integrante.id}`}
      hover
      className={`group grid gap-6 ${featured ? 'items-center sm:grid-cols-[minmax(0,14rem)_1fr]' : ''}`}
    >
      <img
        src={integrante.foto}
        alt={`Foto de ${integrante.nombre}`}
        width="800"
        height="800"
        className="aspect-square w-full rounded-card object-cover"
      />

      <div>
        <h3 className="text-fg">{integrante.nombre}</h3>
        <p className="mt-1 font-semibold text-fg-muted">
          {integrante.ciudad} · {integrante.edad} años
        </p>
        {featured && <p className="mt-3">{integrante.descripcion}</p>}

        <ul className="mt-4 flex flex-wrap gap-2">
          {integrante.habilidades.map((habilidad) => (
            <li key={habilidad}>
              <Badge>{habilidad}</Badge>
            </li>
          ))}
        </ul>

        <span className="mt-5 inline-flex items-center gap-1 font-bold text-primary">
          Ver perfil
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Card>
  )
}

export default MemberCard
