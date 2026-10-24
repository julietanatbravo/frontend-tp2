// Desplegable discreto para información secundaria (cerrado por defecto)
function Disclosure({ summary, children }) {
  return (
    <details className="group border-t border-border pt-4">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-pill text-small font-semibold text-fg-muted hover:text-fg [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true">ℹ️</span>
        {summary}
        <span className="transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
      </summary>

      <div className="mt-4 grid max-w-3xl gap-3 rounded-card bg-surface px-6 py-5 text-fg-muted">
        {children}
      </div>
    </details>
  )
}

export default Disclosure
