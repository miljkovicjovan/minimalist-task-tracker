import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function DeleteTasks({onDeleteAll}) {
    const [hover, setHover] = useState(false);
    const toggleHover = () => setHover(!hover);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button 
                className={`mx-auto mt-3 border-danger ${hover ? "bg-dark text-danger" : "bg-danger text-white"}`}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
                onClick={handleShow}
            >
                <FontAwesomeIcon icon={faTrashCan} className='pe-1'/>
                Delete all Tasks
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete all your active tasks?
                    <br/>Once you delete your tasks you cannot get them back!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => {
                        handleClose();
                        onDeleteAll();
                    }}>
                        I'm sure
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteTasks;