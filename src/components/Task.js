import { Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Task({ name }) {
  return (
    <Stack direction="horizontal" className="m-2 border rounded d-flex justify-content-between">
      <span className="p-2">{name}</span>
      <span>
        <Button className="bg-success border-success border-2 rounded-0"><FontAwesomeIcon icon={faPenToSquare}/></Button>
        <Button className="bg-danger border-danger border-2 rounded-0 rounded-end"><FontAwesomeIcon icon={faTrash}/></Button>
      </span>
    </Stack>
  )
}

export default Task;