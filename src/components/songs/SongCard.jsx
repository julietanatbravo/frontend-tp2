import { formatDuration } from '../../utils/text'
import Button from '../ui/Button'
import Card from '../ui/Card'
import PlayButton from './PlayButton'
import SongCover from './SongCover'

function SongCard({ song, status, progress, onToggle, onOpenDetail }) {
  return (
    <Card as="article" hover className="flex flex-col overflow-hidden p-0!">
      <button
        type="button"
        onClick={() => onOpenDetail(song)}
        className="cursor-zoom-in"
        aria-label={`Ver detalle de ${song.titulo}`}
      >
        <SongCover song={song} status={status} progress={progress} />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl text-fg">{song.titulo}</h3>
        <p className="mt-1 font-semibold text-fg-muted">{song.creditos}</p>
        <p className="mt-1 text-small text-fg-muted">
          {song.album} · {song.anio} · {formatDuration(song.duracion)}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-4">
          <PlayButton song={song} status={status} onToggle={onToggle} />
          <Button variant="secondary" onClick={() => onOpenDetail(song)} className="px-4! py-2!">
            Detalle
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default SongCard
