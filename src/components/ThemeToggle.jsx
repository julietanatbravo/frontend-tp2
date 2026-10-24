import { useTheme } from '../hooks/useTheme'
import Button from './ui/Button'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      variant="secondary"
      className="px-4! py-2!"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
    >
      {isDark ? '☀️ Día' : '🌙 Noche'}
    </Button>
  )
}

export default ThemeToggle
