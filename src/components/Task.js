import { Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Task({ id, name, onDelete, onEdit }) {
  return (
    <Stack direction="horizontal" className="m-2 border rounded d-flex justify-content-between">
      <span className="p-2">{name}</span>
      <span>
        <Button 
          className="bg-success border-success border-2 rounded-0"
          onClick={() => onEdit(id)}
        >
          <FontAwesomeIcon icon={faCheck}/>
        </Button>
        <Button 
          className="bg-primary border-primary border-2 rounded-0"
          onClick={() => onEdit(id)}
        >
          <FontAwesomeIcon icon={faPenToSquare}/>
        </Button>
        <Button 
          className="bg-danger border-danger border-2 rounded-0 rounded-end"
          onClick={() => onDelete(id)}
        >
          <FontAwesomeIcon icon={faTrash}/>
        </Button>
      </span>
    </Stack>
  )
}

export default Task;