import { Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

function Task({ id, name, onDelete, onEdit, onComplete }) {
  const [editedName, setEditedName] = useState(name);
  const [editMode, setEditMode] = useState(false);

  return (
    <Stack direction="horizontal" className="m-2 border rounded d-flex justify-content-between">
      {!editMode ? <span className="p-2">{name}</span> :
      <span className="d-flex align-items-center">
        <span className="text-secondary ps-2 pe-1"><i>Edit Mode</i></span>
        <form onSubmit={(e) => {
          e.preventDefault();
          onEdit(editedName, id);
          setEditMode(false);
        }}>
          <input 
            type="text" 
            value={editedName}
            placeholder="Add a Task"
            className='bg-dark text-light rounded p-1 border-0'
            onChange={(e) => setEditedName(e.target.value)}
          />
        </form>        
      </span>}
      <span>
        <Button 
          className="bg-success border-success border-2 rounded-0 finish-task"
          onClick={() => onComplete(name, id)}
        >
          <FontAwesomeIcon icon={faCheck}/>
        </Button>
        <Tooltip
            anchorSelect=".finish-task"
            content="Finish Task"
        />
        <Button 
          className="bg-primary border-primary border-2 rounded-0 edit-task"
          onClick={() => setEditMode(!editMode)}
        >
          <FontAwesomeIcon icon={faPenToSquare}/>
        </Button>
        <Tooltip
            anchorSelect=".edit-task"
            content="Edit Task"
        />
        <Button 
          className="bg-danger border-danger border-2 rounded-0 rounded-end delete-task"
          onClick={() => onDelete(id)}
        >
          <FontAwesomeIcon icon={faTrash}/>
        </Button>
        <Tooltip
            anchorSelect=".delete-task"
            content="Delete Task"
        />
      </span>
    </Stack>
  )
}

export default Task;