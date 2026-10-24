import Card from '../ui/Card'
import TypeBadge from './TypeBadge'

// hideTypes: oculta los tipos; hideIdentity: muestra la silueta sin nombre
function PokemonCard({ pokemon, role, hideTypes = false, hideIdentity = false }) {
  return (
    <Card className="flex flex-col items-center text-center">
      <p className="text-small font-bold uppercase tracking-widest text-fg-muted">{role}</p>
      <img
        src={pokemon.image}
        alt={hideIdentity ? 'Pokémon misterioso' : pokemon.name}
        width="160"
        height="160"
        className={`my-2 size-40 object-contain ${hideIdentity ? 'brightness-0 dark:invert' : ''}`}
      />
      <h3 className="text-fg">{hideIdentity ? '???' : pokemon.name}</h3>
      <div className="mt-2 flex min-h-7 flex-wrap justify-center gap-1.5">
        {hideTypes ? (
          <span className="text-small text-fg-muted">Tipos ocultos</span>
        ) : (
          pokemon.types.map((type) => <TypeBadge key={type} type={type} />)
        )}
      </div>
    </Card>
  )
}

export default PokemonCard
