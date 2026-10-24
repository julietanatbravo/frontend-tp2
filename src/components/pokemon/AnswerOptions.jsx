import { MULTIPLIERS } from '../../utils/effectiveness'

// answer: valor elegido (null si todavía no respondió); correct: valor correcto
function AnswerOptions({ answer, correct, onAnswer }) {
  const answered = answer !== null

  return (
    <div role="group" aria-label="Multiplicador de daño" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {MULTIPLIERS.map((m) => {
        const isCorrect = answered && m.value === correct
        const isWrongPick = answered && m.value === answer && !isCorrect

        let style = 'btn-secondary'
        if (isCorrect) style = 'btn-primary'
        else if (answered) style = `btn-secondary opacity-50 ${isWrongPick ? 'line-through' : ''}`

        return (
          <button
            key={m.value}
            type="button"
            onClick={() => onAnswer(m.value)}
            disabled={answered}
            className={`btn ${style} flex-col gap-0! py-2! disabled:cursor-default disabled:hover:transform-none disabled:hover:animate-none`}
          >
            <span className="font-display text-h3">
              {isCorrect && '✓ '}
              {isWrongPick && '✗ '}
              {m.symbol}
            </span>
            <span className="text-small font-semibold">{m.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default AnswerOptions
