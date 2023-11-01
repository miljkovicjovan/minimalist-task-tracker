import { Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

function Task({ id, index, name, onDelete, onEdit, onComplete }) {
  const [editedName, setEditedName] = useState(name);
  const [editMode, setEditMode] = useState(false);

  const [finishHover, setFinishHover] = useState(false);
  const toggleHoverFinish = () => setFinishHover(!finishHover);
  const [editHover, setEditHover] = useState(false);
  const toggleHoverEdit = () => setEditHover(!editHover);
  const [deleteHover, setDeleteHover] = useState(false);
  const toggleHoverDelete = () => setDeleteHover(!deleteHover);

  return (
    <Stack 
      direction="horizontal" 
      className="task m-2 mx-auto border rounded d-flex justify-content-between"
    >
      {!editMode ? <span className="p-2">#{index+1} {name}</span> :
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
          className={`border-success border-2 rounded-0 finish-task 
          ${finishHover ? "bg-light border-light text-success" : "bg-success text-light"}`}
          onMouseEnter={toggleHoverFinish}
          onMouseLeave={toggleHoverFinish}
          onClick={() => onComplete(name, id)}
        >
          <FontAwesomeIcon icon={faCheck}/>
        </Button>
        <Tooltip
            className="d-none d-lg-block"
            anchorSelect=".finish-task"
            content="Finish Task"
        />
        <Button 
          className={`border-primary border-2 rounded-0 edit-task 
          ${editHover ? "bg-light border-light text-primary" : "bg-primary text-light"}`}
          onMouseEnter={toggleHoverEdit}
          onMouseLeave={toggleHoverEdit}
          onClick={() => setEditMode(!editMode)}
        >
          <FontAwesomeIcon icon={faPenToSquare}/>
        </Button>
        <Tooltip
            className="d-none d-lg-block"
            anchorSelect=".edit-task"
            content="Edit Task"
        />
        <Button 
          className={`border-danger border-2 rounded-0 rounded-end delete-task 
          ${deleteHover ? "bg-light border-light text-danger" : "bg-danger text-light"}`}
          onMouseEnter={toggleHoverDelete}
          onMouseLeave={toggleHoverDelete}
          onClick={() => onDelete(id)}
        >
          <FontAwesomeIcon icon={faTrash}/>
        </Button>
        <Tooltip
            className="d-none d-lg-block"
            anchorSelect=".delete-task"
            content="Delete Task"
        />
      </span>
    </Stack>
  )
}

export default Task;
