import { Link } from 'react-router'
import MemberCard from '../components/home/MemberCard'
import MoonIllustration from '../components/home/MoonIllustration'
import SectionCard from '../components/home/SectionCard'
import Badge from '../components/ui/Badge'
import equipo from '../data/equipo.json'
import integrantes from '../data/integrantes.json'
import secciones from '../data/secciones.json'

function SectionTitle({ eyebrow, title, children }) {
  return (
    <header className="mb-6">
      <p className="text-small font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-1">{title}</h2>
      {children && <p className="mt-2 text-fg-muted">{children}</p>}
    </header>
  )
}

function Home() {
  // Con un solo integrante, la tarjeta se muestra grande y el botón principal va directo a su perfil
  const soloIntegrante = integrantes.length === 1 ? integrantes[0] : null

  return (
    <div className="grid gap-16">
      <section className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Badge className="animate-fade-up">✨ {equipo.bajada}</Badge>
          <h1
            className="mt-4 animate-fade-up text-[clamp(2.4rem,5vw,3.5rem)] leading-[1.05]"
            style={{ animationDelay: '.1s' }}
          >
            {equipo.nombre}
          </h1>
          <p className="mt-5 max-w-xl animate-fade-up text-lg text-fg-muted" style={{ animationDelay: '.2s' }}>
            {equipo.descripcion}
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: '.3s' }}>
            {soloIntegrante ? (
              <Link to={`/integrantes/${soloIntegrante.id}`} className="btn btn-primary">
                Conocé a {soloIntegrante.nombreCorto}
              </Link>
            ) : (
              <a href="#integrantes" className="btn btn-primary">
                Conocé al equipo
              </a>
            )}
            <Link to="/bitacora" className="btn btn-secondary">
              Mirá la bitácora
            </Link>
          </div>
        </div>

        <MoonIllustration />
      </section>

      <section id="integrantes" className="scroll-mt-20">
        <SectionTitle eyebrow="01 · Equipo" title="Integrantes">
          {soloIntegrante ? equipo.nota : 'Tocá un nombre para ver su perfil.'}
        </SectionTitle>
        <div className={soloIntegrante ? 'grid' : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'}>
          {integrantes.map((integrante) => (
            <MemberCard key={integrante.id} integrante={integrante} featured={soloIntegrante !== null} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="02 · Secciones" title="Recorré el sitio" />
        <ul className="grid gap-6 sm:grid-cols-2">
          {secciones.map((seccion) => (
            <li key={seccion.to}>
              <SectionCard seccion={seccion} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Home
