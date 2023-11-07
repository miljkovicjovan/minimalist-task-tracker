import { Modal, Button } from "react-bootstrap";

function ConfirmationModal({ title, body, handleClose, handleShow, onConfirm, color, onToggle }) {
  return (
    <Modal fullscreen="sm-down" show={handleShow} onHide={handleClose}>
			<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{body}</Modal.Body>
			<Modal.Footer className="d-flex justify-content-between">
				<span><input type="checkbox" onChange={onToggle} /> Don't show this again!</span>
				<span>
					<Button className="me-1" variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant={color} onClick={onConfirm}>
						I'm sure
					</Button>
				</span>
			</Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal;