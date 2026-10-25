// Ilustración decorativa de la portada: luna, espiral y destellos (basada en la vista previa del tema)
const SPARKLE_PATH = 'M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z'

const sparkles = [
  { className: 'top-[4%] left-[10%] w-10', delay: '0s' },
  { className: 'top-[10%] right-[8%] w-6', delay: '.7s' },
  { className: 'bottom-[14%] left-[4%] w-7', delay: '1.3s' },
  { className: 'top-[46%] right-0 w-5', delay: '.3s' },
]

function MoonIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-80" aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-blush shadow-soft-lg dark:bg-surface-strong" />

      <svg
        className="absolute inset-0 m-auto w-[62%] animate-float drop-shadow-[0_10px_30px_rgba(247,224,138,0.55)]"
        viewBox="0 0 100 100"
      >
        <defs>
          <mask id="crescent">
            <rect width="100" height="100" fill="white" />
            <circle cx="66" cy="38" r="34" fill="black" />
          </mask>
        </defs>
        <circle cx="50" cy="50" r="40" fill="#F7E08A" mask="url(#crescent)" />
        <circle cx="30" cy="62" r="4" fill="#EBCB5C" mask="url(#crescent)" />
        <circle cx="40" cy="78" r="2.5" fill="#EBCB5C" mask="url(#crescent)" />
      </svg>

      <svg
        className="absolute right-[4%] bottom-[6%] w-[26%] animate-spin-slow text-primary"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      >
        <path d="M50 50 a5 5 0 0 1 10 0 a10 10 0 0 1 -20 0 a15 15 0 0 1 30 0 a20 20 0 0 1 -40 0 a25 25 0 0 1 50 0" />
      </svg>

      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.className}
          className={`absolute animate-twinkle text-primary-soft dark:text-accent ${sparkle.className}`}
          style={{ animationDelay: sparkle.delay }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={SPARKLE_PATH} />
        </svg>
      ))}
    </div>
  )
}

export default MoonIllustration
