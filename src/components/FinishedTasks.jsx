import { faTrashCan, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { Stack, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

function FinishedTasks(
  { finishedTasks, setFinishedTasks, tasks, onReset, onArchive, settings, setSettings }
) {
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);

  const [hoverArchive, setHoverArchive] = useState(false);
  const toggleHoverArchive = () => setHoverArchive(!hoverArchive);

  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    if (settings.askForArchivingConfirmation) {
      setShow(true); 
      setSelectedTask(id);
    } else onArchive(id);
  }

  const [showArchiveAll, setShowArchiveAll] = useState(false);
  const handleCloseArchiveAll = () => setShowArchiveAll(false);
  const handleShowArchiveAll = () => {
    settings.askForBulkArchivingConfirmation ? setShowArchiveAll(true) : archiveAll();
  };

  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const handleCloseDeleteAll = () => setShowDeleteAll(false);
	const handleShowDeleteAll = () => {
		settings.askForBulkDeletingConfirmation ? setShowDeleteAll(true) : onReset();
	};

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
		if (settings.askForDeletingConfirmation) {
      setShowDelete(true); 
      setSelectedTask(id);
    } else deleteTask(id);
	};

  function deleteTask(id) {
    setFinishedTasks(finishedTasks.filter((task) => task.id !== id));
  }

  function archiveAll() {
    const updatedTasks = finishedTasks.map((task) => {
      return { ...task, archived: true }
    });
    setFinishedTasks(updatedTasks);
  }
  return (
    <>
      <Stack className="text-center pt-4">
        <hr className="mx-auto w-25"/>
        <h4 className="text-decoration-underline">Finished Tasks &#129321;</h4>
        <p className="text-secondary">
          {`Finished: ${finishedTasks.length} `}
          {`- Archived: ${finishedTasks.filter((task) => task.archived).length} `}
          {`- Total: ${finishedTasks.length+tasks.length} `}
          {`- Percentage: ${Math.round((finishedTasks.length / (finishedTasks.length+tasks.length)) * 100)}% `}
        </p>       
        {finishedTasks.map((finishedTask, index) => {
          return finishedTask.archived === false ?
            <span  key={index} className="my-1 d-flex justify-content-center align-items-center">
              <span>#{index + 1} {finishedTask.name}</span>
              <Button className="ms-2" size="sm" onClick={() => handleShow(finishedTask.id)}>
                <FontAwesomeIcon icon={faBoxArchive} className='pe-1' />
                Archive Task
              </Button>
              <Button 
                type="submit"
                variant="danger"
                size="sm"
                className="ms-2"
                onClick={() => handleShowDelete(finishedTask.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </span>
          : ""
        })}
        <span className="mt-4">
          <Button 
            type='submit'
            className={`border-primary ${hoverArchive ? "bg-dark text-primary" : "bg-primary text-white"}`}
            onMouseEnter={toggleHoverArchive}
            onMouseLeave={toggleHoverArchive}
            onClick={() => handleShowArchiveAll()}
          >
            <FontAwesomeIcon icon={faBoxArchive} className='pe-1'/>
            Archive All Tasks
          </Button>
        </span>
        <span className="mt-2">
          <Button 
            type='submit'
            className={`border-danger ${hover ? "bg-dark text-danger" : "bg-danger text-white"}`}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            onClick={() => handleShowDeleteAll()}
          >
              <FontAwesomeIcon icon={faTrashCan} className='pe-1'/>
              Delete All Tasks
          </Button>
        </span> 
      </Stack>
      <ConfirmationModal
        title="Are you sure?"
        body="Are you sure you want to archive this task?"
        handleClose={handleClose}
        handleShow={show}
        onConfirm={() => {
          onArchive(selectedTask);
          handleClose();
        }}
        color="primary"
        onToggle={() => setSettings({ 
          ...settings,
          askForArchivingConfirmation: !settings.askForArchivingConfirmation 
        })}
      />
      <ConfirmationModal
        title="Are you sure?"
        body="Are you sure you want to archive all of these tasks?"
        handleClose={handleCloseArchiveAll}
        handleShow={showArchiveAll}
        onConfirm={() => {
          archiveAll();
          handleCloseArchiveAll();
        }}
        color="primary"
        onToggle={() => setSettings({ 
          ...settings,
          askForBulkArchivingConfirmation: !settings.askForBulkArchivingConfirmation 
        })}
      />
      <ConfirmationModal
        title="Are you sure?"
        body={<>Are you sure you want to delete all your finished tasks?<br/>
        Once you delete your tasks you cannot get them back!</>}
        handleClose={handleCloseDeleteAll}
        handleShow={showDeleteAll}
        onConfirm={() => {
          onReset()
          handleCloseDeleteAll();
        }}
        color="danger"
        onToggle={() => setSettings({ 
          ...settings,
          askForBulkDeletingConfirmation: !settings.askForBulkDeletingConfirmation 
        })}
      />
      <ConfirmationModal
        title="Are you sure?"
        body={<>Are you sure you want to delete this task?<br/>
        Once you delete your task you cannot get it back!</>}
        handleClose={handleCloseDelete}
        handleShow={showDelete}
        onConfirm={() => {
          deleteTask(selectedTask);
          handleCloseDelete();
        }}
        color="danger"
        onToggle={() => setSettings({ 
          ...settings,
          askForDeletingConfirmation: !settings.askForDeletingConfirmation 
        })}
      />
    </>
  )
}

export default FinishedTasks;
