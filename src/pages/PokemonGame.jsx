import PageHeader from '../components/PageHeader'
import ComingSoon from '../components/ComingSoon'

function PokemonGame() {
  return (
    <>
      <PageHeader eyebrow="API pública · PokéAPI" title="¿Es eficaz?">
        Dos Pokémon al azar: adiviná cuánto daño le hace el ataque de uno al otro.
      </PageHeader>
      <ComingSoon />
    </>
  )
}

export default PokemonGame
