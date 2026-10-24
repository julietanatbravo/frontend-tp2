import Input from '../ui/Input'
import SegmentedControl from '../ui/SegmentedControl'

function SongFilters({ query, onQueryChange, artist, onArtistChange, artistOptions }) {
  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,22rem)_1fr] md:items-end">
      <Input
        label="Buscar"
        type="search"
        placeholder="Canción, artista o álbum"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <SegmentedControl
        legend="Artista"
        name="artist"
        options={artistOptions}
        value={artist}
        onChange={onArtistChange}
      />
    </div>
  )
}

export default SongFilters
