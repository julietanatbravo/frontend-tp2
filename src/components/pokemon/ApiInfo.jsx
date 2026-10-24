// Nota para quien revisa: va al pie de la sección, discreta y cerrada por defecto
function ApiInfo() {
  return (
    <details className="group border-t border-border pt-4">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-pill text-small font-semibold text-fg-muted hover:text-fg [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true">ℹ️</span>
        Sobre la API: ¿qué aporta la PokéAPI?
        <span className="transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
      </summary>

      <div className="mt-4 grid max-w-3xl gap-3 rounded-card bg-surface px-6 py-5 text-fg-muted">
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
      </div>
    </details>
  )
}

export default ApiInfo
