import React from "react"
import "./modal.scss"

type ModalProps = {
  isOpen: boolean
  onDismis: () => void
}

export const Modal: React.FC<ModalProps> = (props) => {
  if (!props.isOpen) return null
  return (
    <div className="rjd__modal-container">
      <div className="rjd__modal-bg" onClick={props.onDismis} />

      <div className="rjd_modal-content">{props.children}</div>
    </div>
  )
}
