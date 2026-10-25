import { useEffect, useRef } from 'react'

const SIZES = {
  sm: 'w-[min(28rem,calc(100%-2rem))]',
  lg: 'w-[min(48rem,calc(100%-2rem))]',
}

// Modal con <dialog> nativo: bloquea el fondo, encierra el foco y Escape lo cierra.
// El contenido trae su propio padding, así un clic en el borde del dialog cuenta como "fondo".
function Modal({ open, onClose, labelledBy, size = 'sm', children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Un clic en el fondo oscuro (fuera del contenido) también cierra
  const handleClick = (e) => {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClick}
      aria-labelledby={labelledBy}
      className={`m-auto max-h-[calc(100%-2rem)] overflow-y-auto rounded-card border border-border bg-surface-strong p-0 text-fg shadow-soft-lg backdrop:bg-night/50 backdrop:backdrop-blur-sm ${SIZES[size]}`}
    >
      {children}
    </dialog>
  )
}

export default Modal
