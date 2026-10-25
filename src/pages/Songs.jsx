import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import SongCard from '../components/songs/SongCard'
import SongDetail from '../components/songs/SongDetail'
import SongFilters from '../components/songs/SongFilters'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Disclosure from '../components/ui/Disclosure'
import songs from '../data/canciones.json'
import { useAudioPreview } from '../hooks/useAudioPreview'
import { normalizeText } from '../utils/text'

const ALL = 'todos'

// Las opciones del filtro salen de los datos: si se agrega un artista al JSON, aparece solo
const artistOptions = [
  { value: ALL, label: 'Todos' },
  ...[...new Set(songs.map((song) => song.artista))].map((artista) => ({ value: artista, label: artista })),
]

function Songs() {
  const [query, setQuery] = useState('')
  const [artist, setArtist] = useState(ALL)
  const [detailId, setDetailId] = useState(null)
  const player = useAudioPreview()

  const statusOf = (song) => (player.currentId === song.id ? player.status : 'idle')
  const detailSong = songs.find((song) => song.id === detailId) ?? null

  const search = normalizeText(query.trim())
  const results = songs.filter((song) => {
    const matchesArtist = artist === ALL || song.artista === artist
    const text = normalizeText(`${song.titulo} ${song.creditos} ${song.album}`)
    return matchesArtist && text.includes(search)
  })

  const clearFilters = () => {
    setQuery('')
    setArtist(ALL)
  }

  return (
    <>
      <PageHeader eyebrow="Datos locales" title="Mis 20 canciones">
        Mi top de favoritas de Los Redondos, Duki y Soda Stereo. Tocá ▶ para escuchar un fragmento
        de 30 segundos.
      </PageHeader>

      <div className="grid gap-6">
        <SongFilters
          query={query}
          onQueryChange={setQuery}
          artist={artist}
          onArtistChange={setArtist}
          artistOptions={artistOptions}
        />

        <p className="text-small font-semibold text-fg-muted" aria-live="polite">
          Mostrando {results.length} de {songs.length} canciones
        </p>

        {results.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((song) => (
              <li key={song.id} className="grid">
                <SongCard
                  song={song}
                  status={statusOf(song)}
                  progress={player.progress}
                  onToggle={player.toggle}
                  onOpenDetail={(s) => setDetailId(s.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <Card className="text-center">
            <p className="font-bold">No encontré canciones con esos filtros 🎧</p>
            <p className="mt-1 text-fg-muted">Probá con otra palabra o elegí otro artista.</p>
            <Button variant="secondary" className="mt-4" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          </Card>
        )}

        <SongDetail
          song={detailSong}
          status={detailSong ? statusOf(detailSong) : 'idle'}
          progress={player.progress}
          onToggle={player.toggle}
          onClose={() => setDetailId(null)}
        />

        <Disclosure summary="Sobre los datos: ¿de dónde salen?">
          <p>
            Las canciones están en un archivo local, <span className="code">src/data/canciones.json</span>,
            con 20 registros. La página los recorre para armar las tarjetas, y la búsqueda y el filtro
            trabajan sobre ese mismo listado.
          </p>
          <ul className="grid list-disc gap-2 pl-5">
            <li>
              <strong>Búsqueda:</strong> por título, artista o álbum, sin importar mayúsculas ni tildes.
            </li>
            <li>
              <strong>Filtro:</strong> por la propiedad <span className="code">artista</span>. Las opciones
              se arman con los artistas que hay en el JSON.
            </li>
            <li>
              <strong>Detalle:</strong> tocando la portada o “Detalle” se abre una vista ampliada con
              fecha de lanzamiento, número de pista, género y enlace a Apple Music.
            </li>
            <li>
              Los datos de cada tema (álbum, fechas, duración, portada, fragmento de 30 segundos y
              enlace) se tomaron una vez del catálogo público de iTunes y se guardaron en el JSON.
            </li>
          </ul>
        </Disclosure>
      </div>
    </>
  )
}

export default Songs
