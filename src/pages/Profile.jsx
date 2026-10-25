import { Link, useParams } from 'react-router'
import PageHeader from '../components/PageHeader'
import FavoriteList from '../components/profile/FavoriteList'
import FavoritePokemon from '../components/profile/FavoritePokemon'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import integrantes from '../data/integrantes.json'
import NotFound from './NotFound'

function Profile() {
  const { id } = useParams()
  const integrante = integrantes.find((i) => i.id === id)

  if (!integrante) return <NotFound />

  const datos = [
    { etiqueta: 'Nombre', valor: integrante.nombre },
    { etiqueta: 'Ciudad', valor: integrante.ciudad },
    { etiqueta: 'Edad', valor: `${integrante.edad} años` },
  ]

  return (
    <>
      <PageHeader eyebrow="Perfil" title={integrante.nombre} />

      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,18rem)_1fr]">
        {/* Columna izquierda: foto + pokébola */}
        <Card className="grid gap-6">
          <img
            src={integrante.foto}
            alt={`Foto de ${integrante.nombre}`}
            width="800"
            height="800"
            className="aspect-square w-full rounded-card object-cover"
          />
          <FavoritePokemon names={integrante.pokemonFavoritos} />
        </Card>

        <Card className="grid gap-8">
          <dl className="grid gap-3 sm:grid-cols-3">
            {datos.map((dato) => (
              <div key={dato.etiqueta} className="rounded-card bg-surface px-4 py-3">
                <dt className="text-small font-bold uppercase tracking-widest text-fg-muted">{dato.etiqueta}</dt>
                <dd className="mt-1 font-bold text-fg">{dato.valor}</dd>
              </div>
            ))}
          </dl>

          <p className="text-lg">{integrante.descripcion}</p>

          <section>
            <h3 className="text-lg text-fg">Habilidades</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {integrante.habilidades.map((habilidad) => (
                <li key={habilidad}>
                  <Badge className="px-4! py-1! text-body!">{habilidad}</Badge>
                </li>
              ))}
            </ul>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <FavoriteList title="Películas favoritas" items={integrante.peliculas} />
            <FavoriteList title="Discos favoritos" items={integrante.discos} />
          </div>

          <Link to="/" className="btn btn-secondary justify-self-start">
            ← Volver a la portada
          </Link>
        </Card>
      </div>
    </>
  )
}

export default Profile
