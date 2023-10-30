import { useState } from "react";
import { Button } from "react-bootstrap";

function DeleteTasks({onDeleteAll}) {
    const [hover, setHover] = useState(false);
    const toggleHover = () => setHover(!hover);
    return (
        <Button 
            className={`mx-auto mt-3 border-danger ${hover ? "bg-danger text-white" : "bg-dark text-danger"}`}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            onClick={onDeleteAll}
        >
            Delete all Tasks
        </Button>
    )
}

export default DeleteTasks;