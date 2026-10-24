// Grupo de opciones excluyentes con forma de píldoras (radios nativos por debajo)
function SegmentedControl({ legend, name, options, value, onChange, children }) {
  return (
    <fieldset>
      <legend className="mb-2 text-small font-bold uppercase tracking-widest text-fg-muted">
        {legend}
      </legend>
      <div className="inline-flex flex-wrap gap-1 rounded-card border border-border bg-surface-strong p-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer rounded-pill px-4 py-1.5 font-bold text-fg-muted transition-colors hover:text-fg has-checked:bg-primary has-checked:text-primary-fg has-focus-visible:outline-3 has-focus-visible:outline-ring"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
      {children}
    </fieldset>
  )
}

export default SegmentedControl
