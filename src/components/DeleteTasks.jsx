import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";

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
            <ConfirmationModal
                title="Are you sure?"
                body={<>Are you sure you want to delete all your active tasks?<br/>
                Once you delete your tasks you cannot get them back!</>}
                handleClose={handleClose}
                handleShow={show}
                onConfirm={() => {
                    handleClose();
                    onDeleteAll();
                }}
                color="danger"
            />
        </>
    )
}

export default DeleteTasks;