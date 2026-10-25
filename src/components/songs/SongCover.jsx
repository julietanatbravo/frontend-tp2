// Portada con la barra de progreso del preview encima (si es la canción que suena)
function SongCover({ song, status, progress, className = '' }) {
  const showProgress = status === 'playing' || status === 'paused'

  return (
    <div className={`relative overflow-hidden ${className}`}>
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
  )
}

export default SongCover
