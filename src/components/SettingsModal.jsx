import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function SettingsModal() {

	const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
		<>
			<Button 
				variant="dark"
				className="rounded-circle position-fixed"
				style={{top:"15px", right:"15px"}}
				onClick={() => handleShow()}
			>
				<FontAwesomeIcon icon={faGear}/>
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
						<Modal.Title>Settings</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Settings body asdsfsfs fsdf sf sdf sf sdf 
				</Modal.Body>
			</Modal>
		</>
  )
}

export default SettingsModal;