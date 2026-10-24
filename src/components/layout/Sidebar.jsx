import { NavLink } from 'react-router'
import integrantes from '../../data/integrantes.json'
import ThemeToggle from '../ThemeToggle'
import Brand from './Brand'

const secciones = [
  { to: '/canciones', label: 'Canciones', icon: '🎵' },
  { to: '/pokemon', label: '¿Es eficaz?', icon: '⚡' },
  { to: '/arbol', label: 'Árbol de componentes', icon: '🌳' },
  { to: '/bitacora', label: 'Bitácora', icon: '📓' },
]

function SidebarLink({ to, icon, children, onNavigate, end }) {
  return (
    <NavLink to={to} end={end} onClick={onNavigate} className="nav-link w-full gap-2">
      <span aria-hidden="true">{icon}</span>
      {children}
    </NavLink>
  )
}

function Sidebar({ id, open, onClose }) {
  return (
    <aside
      id={id}
      className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col gap-8 overflow-y-auto border-r border-border bg-surface-strong p-5 transition-[translate,visibility] duration-300 lg:sticky lg:top-0 lg:h-screen lg:visible lg:translate-x-0 ${
        open ? 'visible translate-x-0' : 'invisible -translate-x-full'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <Brand onClick={onClose} />
        <button
          type="button"
          onClick={onClose}
          className="rounded-pill px-2 text-xl text-fg-muted hover:bg-surface lg:hidden"
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      </div>

      <nav aria-label="Secciones" className="grid gap-6">
        <ul className="grid gap-1">
          <li>
            <SidebarLink to="/" icon="🏠" end onNavigate={onClose}>
              Portada
            </SidebarLink>
          </li>
        </ul>

        <div>
          <p className="mb-2 px-3 text-small font-bold uppercase tracking-widest text-fg-muted">
            Integrantes
          </p>
          <ul className="grid gap-1">
            {integrantes.map((integrante) => (
              <li key={integrante.id}>
                <SidebarLink to={`/integrantes/${integrante.id}`} icon="👤" onNavigate={onClose}>
                  {integrante.nombreCorto}
                </SidebarLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 px-3 text-small font-bold uppercase tracking-widest text-fg-muted">
            Secciones
          </p>
          <ul className="grid gap-1">
            {secciones.map((seccion) => (
              <li key={seccion.to}>
                <SidebarLink to={seccion.to} icon={seccion.icon} onNavigate={onClose}>
                  {seccion.label}
                </SidebarLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </aside>
  )
}

export default Sidebar
