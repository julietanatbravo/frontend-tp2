import { useState } from 'react'
import levels from '../../data/difficultyLevels.json'
import { usePokemonRound } from '../../hooks/usePokemonRound'
import Button from '../ui/Button'
import Card from '../ui/Card'
import ConfirmDialog from '../ui/ConfirmDialog'
import AnswerOptions from './AnswerOptions'
import DifficultySelector from './DifficultySelector'
import PokemonCard from './PokemonCard'
import RoundResultModal from './RoundResultModal'
import ScoreBoard from './ScoreBoard'
import TypeBadge from './TypeBadge'

// La mejor racha se guarda aparte para cada nivel
const bestStreakKey = (level) => `pokemon-best-streak-${level}`

function loadBestStreak(level) {
  try {
    return Number(localStorage.getItem(bestStreakKey(level))) || 0
  } catch {
    return 0
  }
}

function saveBestStreak(level, value) {
  try {
    localStorage.setItem(bestStreakKey(level), String(value))
  } catch {
    // Sin localStorage la mejor racha dura solo esta sesión
  }
}

function initialScore(level) {
  return { hits: 0, attempts: 0, streak: 0, bestStreak: loadBestStreak(level) }
}

function EffectivenessGame() {
  const { status, round, nextRound } = usePokemonRound()
  const [answer, setAnswer] = useState(null)
  const [levelId, setLevelId] = useState(levels[0].id)
  const [score, setScore] = useState(() => initialScore(levelId))
  // Nivel elegido mientras se espera la confirmación del modal
  const [pendingLevelId, setPendingLevelId] = useState(null)

  const level = levels.find((l) => l.id === levelId)
  const answered = answer !== null

  const handleAnswer = (value) => {
    setAnswer(value)
    const correct = value === round.multiplier
    const streak = correct ? score.streak + 1 : 0
    const bestStreak = Math.max(score.bestStreak, streak)
    if (bestStreak > score.bestStreak) saveBestStreak(levelId, bestStreak)

    setScore({
      hits: score.hits + (correct ? 1 : 0),
      attempts: score.attempts + 1,
      streak,
      bestStreak,
    })
  }

  const handleNext = () => {
    setAnswer(null)
    nextRound()
  }

  // Al cambiar de nivel se reinicia el puntaje y se arma otra ronda,
  // así no se puede mirar los tipos en Fácil y responder en Difícil
  const changeLevel = (newLevelId) => {
    setLevelId(newLevelId)
    setScore(initialScore(newLevelId))
    handleNext()
  }

  // Si ya hay rondas respondidas, se pide confirmación antes de perder la partida
  const handleLevelChange = (newLevelId) => {
    if (score.attempts > 0) setPendingLevelId(newLevelId)
    else changeLevel(newLevelId)
  }

  const confirmLevelChange = () => {
    changeLevel(pendingLevelId)
    setPendingLevelId(null)
  }

  const pendingLevel = levels.find((l) => l.id === pendingLevelId)

  // Lo oculto por el nivel se revela recién al responder
  const hideTypes = level.hideTypes && !answered
  const hideIdentity = level.hideIdentity && !answered

  return (
    <div className="grid gap-6">
      <DifficultySelector value={levelId} onChange={handleLevelChange} />

      <ConfirmDialog
        open={pendingLevelId !== null}
        title="¿Cambiar de dificultad?"
        confirmLabel={`Cambiar a ${pendingLevel?.label}`}
        cancelLabel="Seguir jugando"
        onConfirm={confirmLevelChange}
        onCancel={() => setPendingLevelId(null)}
      >
        Vas a perder la partida actual en {level.label}: {score.hits} de {score.attempts} aciertos
        y una racha de {score.streak}. Tu mejor racha queda guardada.
      </ConfirmDialog>

      <ScoreBoard {...score} />

      {status === 'loading' && (
        <Card className="text-center" role="status">
          <span className="inline-block animate-twinkle" aria-hidden="true">✨</span>{' '}
          Buscando Pokémon salvajes…
        </Card>
      )}

      {status === 'error' && (
        <Card className="text-center" role="alert">
          <p className="font-bold">No se pudo conectar con la PokéAPI 😢</p>
          <p className="mt-1 text-fg-muted">Revisá tu conexión a internet e intentá de nuevo.</p>
          <Button className="mt-4" onClick={handleNext}>
            Reintentar
          </Button>
        </Card>
      )}

      {status === 'ready' && (
        <>
          <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
            <PokemonCard
              pokemon={round.attacker}
              role="Atacante"
              hideTypes={hideTypes}
              hideIdentity={hideIdentity}
            />
            <span className="text-center text-h2" aria-hidden="true">⚔️</span>
            <PokemonCard
              pokemon={round.defender}
              role="Defensor"
              hideTypes={hideTypes}
              hideIdentity={hideIdentity}
            />
          </div>

          <p className="text-center text-lg">
            El atacante usa un movimiento de tipo <TypeBadge type={round.attackType} />.{' '}
            <strong>¿Cuánto daño le hace al defensor?</strong>
          </p>

          <AnswerOptions answer={answer} correct={round.multiplier} onAnswer={handleAnswer} />
        </>
      )}

      <RoundResultModal round={status === 'ready' ? round : null} answer={answer} onNext={handleNext} />
    </div>
  )
}

export default EffectivenessGame
