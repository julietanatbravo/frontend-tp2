import { Link } from 'react-router'
import MemberCard from '../components/home/MemberCard'
import HeroIllustration from '../components/illustrations/HeroIllustration'
import SectionCard from '../components/home/SectionCard'
import Badge from '../components/ui/Badge'
import integrantes from '../data/integrantes.json'
import secciones from '../data/secciones.json'
import sitio from '../data/sitio.json'

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
          <Badge className="animate-fade-up">✨ {sitio.bajada}</Badge>
          <h1
            className="mt-4 animate-fade-up text-[clamp(2.4rem,5vw,3.5rem)] leading-[1.05]"
            style={{ animationDelay: '.1s' }}
          >
            {sitio.nombre}
          </h1>
          <p className="mt-5 max-w-xl animate-fade-up text-lg text-fg-muted" style={{ animationDelay: '.2s' }}>
            {sitio.descripcion}
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: '.3s' }}>
            {soloIntegrante ? (
              <Link to={`/integrantes/${soloIntegrante.id}`} className="btn btn-primary">
                Ver mi perfil
              </Link>
            ) : (
              <a href="#integrantes" className="btn btn-primary">
                Conocé a los integrantes
              </a>
            )}
            <Link to="/bitacora" className="btn btn-secondary">
              Mirá la bitácora
            </Link>
          </div>
        </div>

        <HeroIllustration />
      </section>

      <section id="integrantes" className="scroll-mt-20">
        <SectionTitle eyebrow="01 · Sobre mí" title={soloIntegrante ? 'Integrante' : 'Integrantes'}>
          {soloIntegrante ? sitio.nota : 'Tocá un nombre para ver su perfil.'}
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
