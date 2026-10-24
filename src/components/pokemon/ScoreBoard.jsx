function Stat({ label, value }) {
  return (
    <div className="rounded-card bg-surface px-4 py-3 text-center">
      <p className="font-display text-h3 text-primary">{value}</p>
      <p className="text-small font-bold text-fg-muted">{label}</p>
    </div>
  )
}

function ScoreBoard({ hits, attempts, streak, bestStreak }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Stat label="Aciertos" value={`${hits} de ${attempts}`} />
      <Stat label="Racha" value={streak} />
      <Stat label="Mejor racha" value={bestStreak} />
    </div>
  )
}

export default ScoreBoard
