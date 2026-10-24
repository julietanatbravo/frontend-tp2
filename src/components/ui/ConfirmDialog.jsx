import { useEffect, useRef } from 'react'
import Button from './Button'

// Modal de confirmación con <dialog> nativo: bloquea el fondo, encierra el foco y Escape cancela
function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Un clic en el fondo oscuro (fuera del contenido) también cancela
  const handleClick = (e) => {
    if (e.target === dialogRef.current) onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      onClick={handleClick}
      aria-labelledby="confirm-dialog-title"
      className="m-auto w-[min(28rem,calc(100%-2rem))] rounded-card border border-border bg-surface-strong p-0 text-fg shadow-soft-lg backdrop:bg-night/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <h2 id="confirm-dialog-title" className="text-h3">
          {title}
        </h2>
        <div className="mt-2 text-fg-muted">{children}</div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </dialog>
  )
}

export default ConfirmDialog
