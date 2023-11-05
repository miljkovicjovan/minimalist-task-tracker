import { Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import ConfirmationModal from "./ConfirmationModal";

function Task({ id, index, name, onDelete, onEdit, onComplete, settings, setSettings }) {
  const [editedName, setEditedName] = useState(name);
  const [editMode, setEditMode] = useState(false);

  const [finishHover, setFinishHover] = useState(false);
  const toggleHoverFinish = () => setFinishHover(!finishHover);
  const [editHover, setEditHover] = useState(false);
  const toggleHoverEdit = () => setEditHover(!editHover);
  const [deleteHover, setDeleteHover] = useState(false);
  const toggleHoverDelete = () => setDeleteHover(!deleteHover);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
		settings.askForDeletingConfirmation ? setShow(true) : onDelete(id);;
	};

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => {
    setShowEdit(false)
    setEditMode(false); 
  };
  const handleShowEdit = (editedName, id) => {
    if (settings.askForEditingConfirmation) {
      setShowEdit(true)
    } else {
      onEdit(editedName, id);
      setEditMode(false); 
    }
  };

  return (
    <>
      <Stack 
        direction="horizontal" 
        className="task m-2 mx-auto border rounded d-flex justify-content-between"
      >
        {!editMode ? <span className="p-2">#{index+1} {name}</span> :
        <span className="d-flex align-items-center">
          <span className="text-secondary ps-2 pe-1"><i>Edit Mode</i></span>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleShowEdit(editedName, id);
          }}>
            <input 
              type="text" 
              value={editedName}
              placeholder="Add a Task"
              className="bg-dark text-light rounded p-1 border-0"
              onChange={(e) => setEditedName(e.target.value)}
            />
          </form>        
        </span>}
        <span>
          <Button 
            className={`border-success border-2 rounded-0 finish-task 
            ${finishHover ? "bg-light border-light text-success" : "bg-success text-light"}
            ${editMode && "bg-dark text-light border-light"}`}
            disabled={editMode === true ? true : false}
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
            ${editHover ? "bg-light border-light text-primary" : "bg-primary text-light"}
            ${editMode && "bg-dark text-light border-light"}`}
            disabled={editMode === true ? true : false}
            onMouseEnter={toggleHoverEdit}
            onMouseLeave={toggleHoverEdit}
            onClick={() => {
              setEditMode(true);
              setEditedName(name);
            }}
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
            ${deleteHover ? "bg-light border-light text-danger" : "bg-danger text-light"}
            ${editMode && "bg-dark text-light border-light"}`}
            disabled={editMode === true ? true : false}
            onMouseEnter={toggleHoverDelete}
            onMouseLeave={toggleHoverDelete}
            onClick={handleShow}
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
      <ConfirmationModal
        title="Are you sure?"
        body={<>Are you sure you want to delete this task?<br/>
        Once you delete a task you cannot get it back!</>}
        handleClose={handleClose}
        handleShow={show}
        onConfirm={() => {
          handleClose();
          onDelete(id);
        }}
        color="danger"
        onToggle={() => setSettings({ 
          ...settings,
          askForDeletingConfirmation: !settings.askForDeletingConfirmation 
        })}
      />
      <ConfirmationModal
        title="Are you sure?"
        body={<>Are you sure you want to edit this task?<br/>
          You will lose your previous one!</>}
        handleClose={handleCloseEdit}
        handleShow={showEdit}
        onConfirm={() => {
          onEdit(editedName, id);
          setEditMode(false); 
          handleCloseEdit(); 
        }}
        color="primary"
        onToggle={() => setSettings({ 
          ...settings,
          askForEditingConfirmation: !settings.askForEditingConfirmation 
        })}
      />
    </>
  )
}

export default Task;
