import './ConfirmationModal.css'

export default function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Yes, Continue", cancelText = "Go Back and Edit" }){
  if(!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
