import { formatDuration } from '../../utils/text'
import Button from '../ui/Button'
import Card from '../ui/Card'

const BUTTON_LABELS = {
  idle: '▶ Escuchar',
  loading: '⏳ Cargando…',
  playing: '⏸ Pausar',
  paused: '▶ Seguir',
  error: '↻ Reintentar',
}

// status: estado del reproductor para esta canción ('idle' si no es la actual)
function SongCard({ song, status, progress, onToggle }) {
  const showProgress = status === 'playing' || status === 'paused'

  return (
    <Card as="article" hover className="flex flex-col overflow-hidden p-0!">
      <div className="relative">
        <img
          src={song.portada}
          alt={`Portada de ${song.album}`}
          width="600"
          height="600"
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        {showProgress && (
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-night/30">
            <div className="h-full bg-primary transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl text-fg">{song.titulo}</h3>
        <p className="mt-1 font-semibold text-fg-muted">{song.creditos}</p>
        <p className="mt-1 text-small text-fg-muted">
          {song.album} · {song.anio} · {formatDuration(song.duracion)}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-4">
          <Button
            onClick={() => onToggle(song)}
            aria-pressed={status === 'playing'}
            aria-busy={status === 'loading'}
            className="px-4! py-2!"
          >
            {BUTTON_LABELS[status]}
          </Button>
          {status === 'error' && (
            <span className="text-small font-semibold text-fg-muted" role="alert">
              No se pudo reproducir
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

export default SongCard
