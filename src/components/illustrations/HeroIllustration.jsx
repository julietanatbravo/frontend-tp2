import { Crescent, MusicNote, Pokeball, Sparkle, Vinyl } from './Shapes'

// Ilustración de la portada: la luna del sitio rodeada de lo que hay en el sitio
// (canciones, Pokémon y código). Hecha en SVG con la paleta del tema.
function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-96" role="img" aria-label="Ilustración: luna con un vinilo, una pokébola, notas musicales y una etiqueta de código">
      {/* Fondo y órbita */}
      <circle cx="200" cy="200" r="150" className="fill-blush dark:fill-surface-strong" />
      <circle
        cx="200"
        cy="200"
        r="178"
        fill="none"
        strokeWidth="2"
        strokeDasharray="4 10"
        strokeLinecap="round"
        className="stroke-primary-soft"
      />

      {/* Luna flotando */}
      <g className="animate-float">
        <Crescent x={185} y={170} r={88} id="hero-crescent" />
      </g>

      {/* Vinilo girando: las canciones */}
      <Vinyl x={292} y={292} r={64} spin />

      {/* Pokébola: el juego y el perfil */}
      <g className="animate-float" style={{ animationDelay: '-3s' }}>
        <Pokeball x={92} y={292} r={26} />
      </g>

      {/* Burbuja de código: el proyecto */}
      <g transform="translate(300 92)">
        <path d="M-14 24 l-8 16 l20 -16 z" fill="#D685AD" />
        <rect x="-42" y="-26" width="84" height="52" rx="18" fill="#D685AD" />
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFFFFF"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="26"
          fontWeight="700"
        >
          &lt;/&gt;
        </text>
      </g>

      {/* Notas musicales */}
      <MusicNote x={92} y={118} size={1.1} />
      <MusicNote x={352} y={210} size={0.85} />

      {/* Destellos */}
      <Sparkle x={52} y={60} size={34} />
      <Sparkle x={210} y={30} size={20} delay=".7s" />
      <Sparkle x={42} y={205} size={22} delay="1.3s" />
      <Sparkle x={372} y={330} size={18} delay=".3s" />
      <Sparkle x={185} y={372} size={24} delay="1s" />
    </svg>
  )
}

export default HeroIllustration
