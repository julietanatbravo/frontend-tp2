import { useRef, useState } from 'react'
import { fetchPokemon } from '../../services/pokeapi'
import TypeBadge from '../pokemon/TypeBadge'

// La pokébola tiembla como mínimo este rato, aunque la respuesta ya esté en caché:
// así se ve igual con un Pokémon nuevo que con uno repetido
const MIN_DURATION = 700

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Descarga la imagen antes de mostrarla, así la tarjeta nunca aparece vacía
function preloadImage(url) {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = resolve
    image.onerror = resolve
    image.src = url
  })
}

const STATUS_MESSAGES = {
  idle: 'Tocá la pokébola para abrirla',
  loading: 'Abriendo la pokébola…',
  ready: '',
  error: 'Falló la conexión. Probá de nuevo.',
}

// names: Pokémon favoritos del perfil; sale uno al azar, distinto del anterior
function FavoritePokemon({ names }) {
  const [status, setStatus] = useState('idle')
  const [pokemon, setPokemon] = useState(null)
  const lastNameRef = useRef(null)

  const openPokeball = async () => {
    if (status === 'loading') return
    setStatus('loading')

    // Si el perfil tiene un solo favorito, no queda otra que repetirlo
    const candidates = names.filter((name) => name !== lastNameRef.current)
    const pool = candidates.length > 0 ? candidates : names
    const name = pool[Math.floor(Math.random() * pool.length)]

    try {
      const [result] = await Promise.all([
        fetchPokemon(name).then(async (data) => {
          await preloadImage(data.image)
          return data
        }),
        wait(MIN_DURATION),
      ])
      // Recién cuenta como mostrado si salió bien: si falló, se puede reintentar con el mismo
      lastNameRef.current = name
      setPokemon(result)
      setStatus('ready')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="text-center" aria-labelledby="pokemon-favorito">
      <p id="pokemon-favorito" className="text-small font-bold uppercase tracking-widest text-fg-muted">
        Pokémon favorito
      </p>

      {/* La pokébola está dibujada con CSS: no usa ninguna imagen */}
      <button
        type="button"
        onClick={openPokeball}
        aria-expanded={pokemon !== null}
        className={`relative mx-auto mt-3 block size-18 cursor-pointer rounded-full border-3 border-night bg-[linear-gradient(to_bottom,#E63946_0_calc(50%-3px),#2B2D52_calc(50%-3px)_calc(50%+3px),#FFFFFF_calc(50%+3px)_100%)] transition-[scale] hover:scale-108 active:scale-95 ${
          status === 'loading' ? 'animate-shake' : ''
        }`}
      >
        <span className="absolute top-1/2 left-1/2 size-6 -translate-1/2 rounded-full border-3 border-night bg-white" />
        <span className="sr-only">Abrir la pokébola</span>
      </button>

      {/* Renglón reservado: el mensaje aparece sin empujar el resto */}
      <p className="mt-3 min-h-[1.4em] text-small leading-[1.4] text-fg-muted" role="status">
        {STATUS_MESSAGES[status]}
      </p>

      {pokemon && (
        // La key nueva reinicia la animación de aparición con cada Pokémon
        <div key={pokemon.id} className="mt-2 animate-fade-up rounded-card bg-surface p-4">
          <img src={pokemon.image} alt="" width="130" height="130" className="mx-auto aspect-square w-32 object-contain" />
          <p className="font-display text-lg text-fg">{pokemon.name}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default FavoritePokemon
