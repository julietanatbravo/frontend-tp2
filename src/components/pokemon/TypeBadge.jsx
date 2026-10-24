import pokemonTypes from '../../data/pokemonTypes.json'

function TypeBadge({ type }) {
  const info = pokemonTypes[type] ?? { label: type, color: 'var(--accent)', text: 'var(--accent-fg)' }

  return (
    <span className="badge" style={{ backgroundColor: info.color, color: info.text }}>
      {info.label}
    </span>
  )
}

export default TypeBadge
