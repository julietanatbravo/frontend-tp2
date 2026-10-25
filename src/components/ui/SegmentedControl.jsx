// Grupo de opciones excluyentes con forma de píldoras (radios nativos por debajo).
// variant "segmented": píldoras dentro de un recuadro, para pocas opciones.
// variant "chips": píldoras sueltas con borde propio, para listas largas como los tags.
const VARIANTS = {
  segmented: {
    group: 'inline-flex flex-wrap gap-1 rounded-card border border-border bg-surface-strong p-1',
    option: '',
  },
  chips: {
    group: 'flex flex-wrap gap-2',
    option: 'border-2 border-border hover:border-primary-soft has-checked:border-primary',
  },
}

function SegmentedControl({ legend, name, options, value, onChange, variant = 'segmented', children }) {
  const styles = VARIANTS[variant]

  return (
    <fieldset>
      <legend className="mb-2 text-small font-bold uppercase tracking-widest text-fg-muted">
        {legend}
      </legend>
      <div className={styles.group}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer rounded-pill px-4 py-1.5 font-bold text-fg-muted transition-colors hover:text-fg has-checked:bg-primary has-checked:text-primary-fg has-focus-visible:outline-3 has-focus-visible:outline-ring ${styles.option}`}
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
