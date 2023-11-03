import { Modal, Button } from "react-bootstrap";

function ConfirmationModal({ title, body, handleClose, handleShow, onConfirm }) {
  return (
    <Modal show={handleShow} onHide={handleClose}>
			<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{body}</Modal.Body>
			<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={onConfirm}>
						I'm sure
					</Button>
			</Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal;