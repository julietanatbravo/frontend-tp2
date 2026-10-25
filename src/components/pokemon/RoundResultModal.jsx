import { useEffect, useRef } from 'react'
import pokemonTypes from '../../data/pokemonTypes.json'
import { formatMultiplier } from '../../utils/effectiveness'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import TypeBadge from './TypeBadge'

// Tiempo hasta pasar solo a la siguiente ronda
const AUTO_ADVANCE_MS = 3000

const typeLabel = (type) => pokemonTypes[type]?.label ?? type

// Resultado de la ronda en un modal, para que siempre quede a la vista.
// Pasa solo a la siguiente ronda; el botón, Escape o el fondo pasan antes.
function RoundResultModal({ round, answer, onNext }) {
  const open = round !== null && answer !== null

  // Se guarda la última versión de onNext para que el temporizador no se reinicie en cada render
  const onNextRef = useRef(onNext)
  useEffect(() => {
    onNextRef.current = onNext
  })

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => onNextRef.current(), AUTO_ADVANCE_MS)
    return () => clearTimeout(timer)
  }, [open])

  const isCorrect = open && answer === round.multiplier

  return (
    <Modal open={open} onClose={onNext} labelledBy="round-result-title">
      {open && (
        <div className="p-6 text-center">
          <p className="text-h1" aria-hidden="true">
            {isCorrect ? '🎉' : '😅'}
          </p>
          <h2 id="round-result-title" className="mt-1 text-h3">
            {isCorrect ? '¡Correcto!' : `Casi… era ${formatMultiplier(round.multiplier)}`}
          </h2>
          {!isCorrect && <p className="mt-1 text-fg-muted">Elegiste {formatMultiplier(answer)}</p>}

          <p className="mt-4">
            <strong>{round.attacker.name}</strong> usó un movimiento de tipo{' '}
            <TypeBadge type={round.attackType} /> contra <strong>{round.defender.name}</strong>.
          </p>

          <p className="mt-3 rounded-card bg-surface px-4 py-3 text-fg-muted">
            {round.breakdown.map((b, i) => (
              <span key={b.type}>
                {i > 0 && ' · '}
                {typeLabel(round.attackType)} → {typeLabel(b.type)} {formatMultiplier(b.multiplier)}
              </span>
            ))}
            {round.breakdown.length > 1 && (
              <strong className="text-fg"> = {formatMultiplier(round.multiplier)}</strong>
            )}
          </p>

          <Button className="mt-5 w-full" onClick={onNext}>
            Siguiente ronda →
          </Button>

          <div className="mt-4 h-1.5 overflow-hidden rounded-pill bg-surface" aria-hidden="true">
            <div
              className="h-full origin-left animate-countdown bg-primary"
              style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
            />
          </div>
          <p className="mt-2 text-small text-fg-muted">
            La próxima ronda arranca sola en {AUTO_ADVANCE_MS / 1000} segundos
          </p>
        </div>
      )}
    </Modal>
  )
}

export default RoundResultModal
