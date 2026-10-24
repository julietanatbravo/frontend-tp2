import PageHeader from '../components/PageHeader'
import ApiInfo from '../components/pokemon/ApiInfo'
import EffectivenessGame from '../components/pokemon/EffectivenessGame'

function PokemonGame() {
  return (
    <>
      <PageHeader eyebrow="API pública · PokéAPI" title="¿Es eficaz?">
        Dos Pokémon al azar: adiviná cuánto daño le hace el ataque de uno al otro.
      </PageHeader>
      <div className="grid gap-8">
        <EffectivenessGame />
        <ApiInfo />
      </div>
    </>
  )
}

export default PokemonGame
