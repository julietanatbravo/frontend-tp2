import { Crescent, MusicNote, Pokeball, Sparkle, Vinyl } from './Shapes'

// Marco común de las ilustraciones de cada sección: círculo de fondo y dos destellos
function Frame({ label, children }) {
  return (
    <svg viewBox="0 0 200 200" className="size-36 lg:size-44" role="img" aria-label={label}>
      <circle cx="100" cy="100" r="78" className="fill-blush dark:fill-surface-strong" />
      {children}
      <Sparkle x={30} y={36} size={22} />
      <Sparkle x={176} y={160} size={16} delay=".8s" />
    </svg>
  )
}

export function SongsIllustration() {
  return (
    <Frame label="Ilustración: vinilo con notas musicales">
      <Vinyl x={96} y={106} r={58} spin />
      <MusicNote x={160} y={56} size={0.9} />
      <MusicNote x={40} y={150} size={0.7} className="fill-secondary" />
    </Frame>
  )
}

export function PokemonIllustration() {
  return (
    <Frame label="Ilustración: pokébola con un rayo">
      <g className="animate-float">
        <Pokeball x={96} y={108} r={50} />
      </g>
      <path
        d="M158 34 l-22 34 h16 l-12 30 l30 -40 h-16 z"
        fill="#F7E08A"
        stroke="#2B2D52"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </Frame>
  )
}

export function TreeIllustration() {
  // Nodos del árbol: el de arriba es App y se abre en dos ramas
  const nodes = [
    { x: 100, y: 48, r: 16, className: 'fill-primary' },
    { x: 58, y: 104, r: 13, className: 'fill-secondary' },
    { x: 142, y: 104, r: 13, className: 'fill-secondary' },
    { x: 36, y: 156, r: 10, className: 'fill-accent' },
    { x: 80, y: 156, r: 10, className: 'fill-accent' },
    { x: 142, y: 156, r: 10, className: 'fill-accent' },
  ]
  const links = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5],
  ]

  return (
    <Frame label="Ilustración: árbol de nodos conectados">
      {links.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-primary-soft"
        />
      ))}
      {nodes.map((node) => (
        <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r={node.r} className={node.className} />
      ))}
    </Frame>
  )
}

export function LogIllustration() {
  return (
    <Frame label="Ilustración: cuaderno con una luna en la tapa y un lápiz">
      <g transform="rotate(-6 100 104)">
        <rect x="52" y="44" width="92" height="118" rx="10" fill="#D685AD" />
        <rect x="52" y="44" width="16" height="118" rx="6" fill="#BE4A74" />
        {[60, 82, 104, 126, 148].map((y) => (
          <circle key={y} cx="60" cy={y} r="3" fill="#FFF6E8" />
        ))}
        <Crescent x={108} y={92} r={22} id="log-crescent" />
        <rect x="80" y="128" width="50" height="6" rx="3" fill="#FFF6E8" opacity="0.8" />
        <rect x="80" y="140" width="34" height="6" rx="3" fill="#FFF6E8" opacity="0.6" />
      </g>
      <g transform="rotate(35 150 120)">
        <rect x="142" y="70" width="14" height="74" rx="3" fill="#F7E08A" stroke="#2B2D52" strokeWidth="2.5" />
        <path d="M142 144 l7 16 l7 -16 z" fill="#FFF6E8" stroke="#2B2D52" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="142" y="62" width="14" height="10" rx="3" fill="#F4B6C2" stroke="#2B2D52" strokeWidth="2.5" />
      </g>
    </Frame>
  )
}

export function LostIllustration() {
  return (
    <Frame label="Ilustración: luna con un signo de pregunta">
      <g className="animate-float">
        <Crescent x={92} y={104} r={60} id="lost-crescent" />
      </g>
      <text
        x="146"
        y="80"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Fredoka, ui-rounded, sans-serif"
        fontWeight="600"
        fontSize="56"
        className="fill-primary"
      >
        ?
      </text>
    </Frame>
  )
}
