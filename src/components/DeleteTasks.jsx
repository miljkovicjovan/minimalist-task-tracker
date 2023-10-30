import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function DeleteTasks({onDeleteAll}) {
    const [hover, setHover] = useState(false);
    const toggleHover = () => setHover(!hover);
    return (
        <Button 
            className={`mx-auto mt-3 border-danger ${hover ? "bg-dark text-danger" : "bg-danger text-white"}`}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            onClick={onDeleteAll}
        >
            <FontAwesomeIcon icon={faTrashCan} className='pe-1'/>
            Delete all Tasks
        </Button>
    )
}

export default DeleteTasks;