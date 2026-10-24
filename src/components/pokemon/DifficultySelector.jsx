import levels from '../../data/difficultyLevels.json'

function DifficultySelector({ value, onChange }) {
  const current = levels.find((level) => level.id === value)

  return (
    <fieldset>
      <legend className="mb-2 text-small font-bold uppercase tracking-widest text-fg-muted">
        Dificultad
      </legend>
      <div className="inline-flex flex-wrap gap-1 rounded-pill border border-border bg-surface-strong p-1">
        {levels.map((level) => (
          <label
            key={level.id}
            className="cursor-pointer rounded-pill px-4 py-1.5 font-bold text-fg-muted transition-colors hover:text-fg has-checked:bg-primary has-checked:text-primary-fg has-focus-visible:outline-3 has-focus-visible:outline-ring"
          >
            <input
              type="radio"
              name="difficulty"
              value={level.id}
              checked={level.id === value}
              onChange={() => onChange(level.id)}
              className="sr-only"
            />
            {level.label}
          </label>
        ))}
      </div>
      <p className="mt-2 text-small text-fg-muted">{current.description}</p>
    </fieldset>
  )
}

export default DifficultySelector
