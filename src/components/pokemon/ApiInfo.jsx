import Disclosure from '../ui/Disclosure'

// Nota para quien revisa: va al pie de la sección, discreta y cerrada por defecto
function ApiInfo() {
  return (
    <Disclosure summary="Sobre la API: ¿qué aporta la PokéAPI?">
      <p>
        La <a href="https://pokeapi.co/" target="_blank" rel="noreferrer" className="link">PokéAPI</a>{' '}
        es una API pública y gratuita con datos de todos los juegos de Pokémon. No necesita clave,
        así que se consulta directo desde el navegador. En esta sección usa dos endpoints:
      </p>
      <ul className="grid gap-2">
        <li>
          <span className="code">/pokemon/&#123;id&#125;</span>: el nombre, la imagen oficial y los tipos
          de cada Pokémon.
        </li>
        <li>
          <span className="code">/type/&#123;tipo&#125;</span>: las relaciones de daño del tipo de ataque
          (contra qué tipos es súper eficaz, poco eficaz o no tiene efecto).
        </li>
      </ul>
      <p>
        Si el defensor tiene dos tipos, los multiplicadores se multiplican entre sí. Por eso existen
        el ×4 y el ×¼.
      </p>
    </Disclosure>
  )
}

export default ApiInfo
