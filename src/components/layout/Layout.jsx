import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Brand from './Brand'
import Sidebar from './Sidebar'

const SIDEBAR_ID = 'sidebar'

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  // Con el menú abierto en celular: Escape lo cierra y la página de fondo no scrollea
  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="min-h-screen lg:flex">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-bg/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="btn btn-secondary px-4! py-2!"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls={SIDEBAR_ID}
        >
          ☰
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-night/40 lg:hidden" onClick={closeMenu} aria-hidden="true" />
      )}

      <Sidebar id={SIDEBAR_ID} open={menuOpen} onClose={closeMenu} />

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
