// Logo del equipo: luna creciente con un destello (el mismo dibujo que el favicon)
function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M26.5 19.5A11.5 11.5 0 1 1 13 5.2a9 9 0 0 0 13.5 14.3z" className="fill-primary" />
      <path
        d="M24 3c.4 2.8 2 4.4 4.8 4.8-2.8.4-4.4 2-4.8 4.8-.4-2.8-2-4.4-4.8-4.8 2.8-.4 4.4-2 4.8-4.8z"
        className="fill-accent"
      />
    </svg>
  )
}

export default Logo
