import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

// El tema inicial ya lo aplica el script de index.html; acá solo se lee de <html>
function getCurrentTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getCurrentTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Mientras no haya una preferencia guardada, sigue el modo del sistema
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const handleChange = (e) => {
      if (!getSavedTheme()) setTheme(e.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Si no se puede guardar, el cambio vale solo para esta sesión
    }
  }

  return { theme, toggleTheme }
}
