import Badge from '../ui/Badge'

const PARTS = [
  { key: 'hice', icon: '🛠️', label: 'Qué hice' },
  { key: 'decidi', icon: '🧭', label: 'Qué decidí' },
  { key: 'resolvi', icon: '🧩', label: 'Qué resolví' },
]

// Entrada desplegable. open y onToggle la controlan desde la página (para "Expandir todo")
function LogEntry({ entry, open, onToggle }) {
  return (
    <details
      open={open}
      onToggle={(e) => onToggle(entry.id, e.currentTarget.open)}
      className="card p-0! open:shadow-soft-lg"
    >
      <summary className="flex cursor-pointer list-none items-start gap-4 p-5 [&::-webkit-details-marker]:hidden">
        <span className="font-display text-h3 leading-none text-primary" aria-hidden="true">
          #{entry.id}
        </span>
        <span className="grid flex-1 gap-1">
          <span className="font-display text-xl font-semibold text-fg">{entry.titulo}</span>
          <span className="text-fg-muted">{entry.resumen}</span>
          <span className="mt-1 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </span>
        </span>
        <span
          className="mt-1 text-fg-muted transition-transform [details[open]>summary>&]:rotate-180"
          aria-hidden="true"
        >
          ▾
        </span>
      </summary>

      <div className="grid gap-4 border-t border-border px-5 py-5 sm:pl-16">
        {PARTS.filter((part) => entry[part.key]).map((part) => (
          <section key={part.key}>
            <h3 className="text-base font-bold text-fg">
              <span aria-hidden="true">{part.icon}</span> {part.label}
            </h3>
            <p className="mt-1 text-fg-muted">{entry[part.key]}</p>
          </section>
        ))}
      </div>
    </details>
  )
}

export default LogEntry
