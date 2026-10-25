/* =========================================================
   Piezas de las ilustraciones (SVG). Se dibujan centradas en (x, y)
   y se combinan en la portada y en los encabezados de cada sección.
   ========================================================= */

const NIGHT = '#2B2D52'
const PINK = '#F4B6C2'
const MOON = '#F7E08A'
const MOON_SHADE = '#EBCB5C'

// Destello de cuatro puntas, el mismo de la vista previa del tema
export function Sparkle({ x, y, size = 24, delay = '0s', className = 'fill-primary-soft dark:fill-accent' }) {
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}>
      <path
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
        className={`origin-center animate-twinkle transform-fill ${className}`}
        style={{ animationDelay: delay }}
      />
    </g>
  )
}

// Luna creciente con cráteres. id: cada máscara necesita un id único en la página
export function Crescent({ x, y, r = 80, id }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <mask id={id}>
          <circle r={r} fill="white" />
          <circle cx={r * 0.5} cy={-r * 0.38} r={r * 0.85} fill="black" />
        </mask>
      </defs>
      <g mask={`url(#${id})`}>
        <circle r={r} fill={MOON} />
        <circle cx={-r * 0.45} cy={r * 0.25} r={r * 0.11} fill={MOON_SHADE} />
        <circle cx={-r * 0.2} cy={r * 0.62} r={r * 0.07} fill={MOON_SHADE} />
        <circle cx={-r * 0.68} cy={-r * 0.15} r={r * 0.06} fill={MOON_SHADE} />
      </g>
    </g>
  )
}

// Vinilo. spin: gira lento (la luna del sello deja ver que gira)
export function Vinyl({ x, y, r = 60, spin = false }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={spin ? 'origin-center animate-spin-slow transform-fill' : ''}>
        {/* En modo oscuro el disco se pierde contra el fondo: se le suma un borde rosa */}
        <circle r={r} fill={NIGHT} strokeWidth="3" className="stroke-transparent dark:stroke-pink" />
        {[0.88, 0.76, 0.64, 0.52].map((f) => (
          <circle key={f} r={r * f} fill="none" stroke="#FFFFFF" strokeOpacity="0.13" strokeWidth="1.5" />
        ))}
        <circle r={r * 0.34} fill={PINK} />
        <path
          d={`M${r * 0.05} ${-r * 0.24} a${r * 0.2} ${r * 0.2} 0 1 0 ${r * 0.16} ${r * 0.3} a${r * 0.15} ${r * 0.15} 0 1 1 ${-r * 0.16} ${-r * 0.3}z`}
          fill="#BE4A74"
        />
        <circle r={r * 0.06} fill={NIGHT} />
      </g>
      {/* Brillo fijo: no gira con el disco */}
      <path
        d={`M${-r * 0.62} ${-r * 0.42} A${r * 0.75} ${r * 0.75} 0 0 1 ${-r * 0.1} ${-r * 0.74}`}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.35"
        strokeWidth={r * 0.06}
        strokeLinecap="round"
      />
    </g>
  )
}

// Pokébola dibujada con formas
export function Pokeball({ x, y, r = 24 }) {
  const stroke = Math.max(2, r * 0.14)
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#FFFFFF" stroke={NIGHT} strokeWidth={stroke} />
      <path d={`M${-r} 0 A${r} ${r} 0 0 1 ${r} 0 Z`} fill="#E63946" stroke={NIGHT} strokeWidth={stroke} strokeLinejoin="round" />
      <circle r={r * 0.32} fill="#FFFFFF" stroke={NIGHT} strokeWidth={stroke} />
      <path
        d={`M${-r * 0.55} ${-r * 0.5} A${r * 0.7} ${r * 0.7} 0 0 1 ${-r * 0.1} ${-r * 0.75}`}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.6"
        strokeWidth={stroke * 0.8}
        strokeLinecap="round"
      />
    </g>
  )
}

// Corchea (nota musical)
export function MusicNote({ x, y, size = 1, className = 'fill-primary' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`} className={className}>
      <ellipse cx="-7" cy="14" rx="9" ry="7" transform="rotate(-20 -7 14)" />
      <rect x="0" y="-22" width="4" height="36" rx="2" />
      <path d="M2 -22 q16 6 14 22 q-4 -10 -14 -10 z" />
    </g>
  )
}
