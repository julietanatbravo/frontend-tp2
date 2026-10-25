import { formatDuration, formatReleaseDate } from '../../utils/text'
import Modal from '../ui/Modal'
import PlayButton from './PlayButton'
import SongCover from './SongCover'

// Vista ampliada de una canción. song es null cuando el modal está cerrado
function SongDetail({ song, status, progress, onToggle, onClose }) {
  const datos = song && [
    { etiqueta: 'Álbum', valor: song.album },
    { etiqueta: 'Lanzamiento', valor: formatReleaseDate(song.lanzamiento) },
    { etiqueta: 'Pista', valor: song.totalPistas === 1 ? 'Single' : `${song.pista} de ${song.totalPistas}` },
    { etiqueta: 'Duración', valor: formatDuration(song.duracion) },
    { etiqueta: 'Género', valor: song.genero },
  ]

  return (
    <Modal open={song !== null} onClose={onClose} labelledBy="song-detail-title" size="lg">
      {song && (
        <div className="relative grid gap-6 p-6 sm:grid-cols-[minmax(0,16rem)_1fr]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 rounded-pill px-2.5 py-1 text-xl text-fg-muted hover:bg-surface"
            aria-label="Cerrar detalle"
          >
            ✕
          </button>

          <SongCover song={song} status={status} progress={progress} className="rounded-card" />

          <div className="flex flex-col">
            <p className="text-small font-bold uppercase tracking-widest text-primary">{song.artista}</p>
            <h2 id="song-detail-title" className="mt-1 pr-8 text-h3">
              {song.titulo}
            </h2>
            <p className="mt-1 font-semibold text-fg-muted">{song.creditos}</p>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
              {datos.map((dato) => (
                <div key={dato.etiqueta}>
                  <dt className="text-small font-bold uppercase tracking-widest text-fg-muted">{dato.etiqueta}</dt>
                  <dd className="font-semibold text-fg">{dato.valor}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <PlayButton song={song} status={status} onToggle={onToggle} />
              <a href={song.appleMusic} target="_blank" rel="noreferrer" className="btn btn-secondary px-4! py-2!">
                Apple Music ↗
              </a>
            </div>
            <p className="mt-3 text-small text-fg-muted">Fragmento de 30 segundos · Datos del catálogo de iTunes</p>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default SongDetail
