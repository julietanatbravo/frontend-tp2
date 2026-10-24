import pokemonTypes from '../../data/pokemonTypes.json'
import { formatMultiplier } from '../../utils/effectiveness'

function RoundResult({ round, isCorrect }) {
  const { attackType, breakdown, multiplier } = round
  const label = (type) => pokemonTypes[type]?.label ?? type

  return (
    <div className="rounded-card border border-border bg-surface px-5 py-4">
      <p className="font-bold">
        {isCorrect ? '¡Correcto! 🎉' : `Casi… era ${formatMultiplier(multiplier)}`}
      </p>
      <p className="mt-1 text-fg-muted">
        {breakdown.map((b, i) => (
          <span key={b.type}>
            {i > 0 && ' · '}
            {label(attackType)} → {label(b.type)} {formatMultiplier(b.multiplier)}
          </span>
        ))}
        {breakdown.length > 1 && <strong className="text-fg"> = {formatMultiplier(multiplier)}</strong>}
      </p>
    </div>
  )
}

export default RoundResult
