import Button from '../ui/Button'

const LABELS = {
  idle: '▶ Escuchar',
  loading: '⏳ Cargando…',
  playing: '⏸ Pausar',
  paused: '▶ Seguir',
  error: '↻ Reintentar',
}

// status: estado del reproductor para esta canción ('idle' si no es la actual)
function PlayButton({ song, status, onToggle }) {
  return (
    <>
      <Button
        onClick={() => onToggle(song)}
        aria-pressed={status === 'playing'}
        aria-busy={status === 'loading'}
        className="px-4! py-2!"
      >
        {LABELS[status]}
      </Button>
      {status === 'error' && (
        <span className="text-small font-semibold text-fg-muted" role="alert">
          No se pudo reproducir
        </span>
      )}
    </>
  )
}

export default PlayButton
