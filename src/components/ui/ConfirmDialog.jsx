import Button from './Button'
import Modal from './Modal'

// Modal de confirmación: Escape, el fondo y "Cancelar" cancelan
function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}) {
  return (
    <Modal open={open} onClose={onCancel} labelledBy="confirm-dialog-title">
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
    </Modal>
  )
}

export default ConfirmDialog
