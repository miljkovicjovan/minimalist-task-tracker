import { faTrashCan, faBoxArchive, faArrowUpFromBracket }
  from "@fortawesome/free-solid-svg-icons";
import { Stack, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

function FinishedTasks(
  {
    finishedTasks, setFinishedTasks,
    tasks, setTasks,
    onReset, onArchive,
    settings, setSettings
  }
) {
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);
  const [hoverArchive, setHoverArchive] = useState(false);
  const toggleHoverArchive = () => setHoverArchive(!hoverArchive);
  const [hoverReactivate, setHoverReactivate] = useState(false);
  const toggleHoverReactivate = () => setHoverReactivate(!hoverReactivate);

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

  const [showReactivateAll, setShowReactivateAll] = useState(false);
  const handleCloseReactivateAll = () => setShowReactivateAll(false);
	const handleShowReactivateAll = () => {
		settings.askForBulkReactivatingConfirmation ? setShowReactivateAll(true) : reactivateAll();
	};

  const [showReactivate, setShowReactivate] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const handleCloseReactivate = () => setShowReactivate(false);
  const handleShowReactivate = (id, name) => {
		if (settings.askForReactivatingConfirmation) {
      setShowReactivate(true); 
      setSelectedTask(name);
      setSelectedId(id);
    } else handleReactivate(id, name);
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

  const handleReactivate = (id, name) => {
    const newTask = { id, name };
    setTasks([...tasks, newTask]);
    setFinishedTasks(finishedTasks.filter((task) => task.id !== id));
  }

  const reactivateAll = () => {
    const updatedTasks = [...tasks];
    const tasksToReactivate = finishedTasks.filter(task => !task.archived);
  
    tasksToReactivate.forEach(task => {
      updatedTasks.push({ id: task.id, name: task.name });
    });
  
    setTasks(updatedTasks);
    setFinishedTasks(finishedTasks.filter(task => task.archived));
  };

  const getDayString = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const daySuffix = getDaySuffix(day);
  
    return `${days[date.getDay()]}, ${day}${daySuffix} of ${month} ${year}`;
  };
  
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  let displayedDays = [];

  return (
    <>
      <Stack className="text-center pt-4">
        <hr className="mx-auto w-25"/>
        <h4 className="text-decoration-underline">Finished Tasks &#129321;</h4>
        <p className="text-secondary">
          {`Finished: ${finishedTasks.length} `}
          {`- Archived: ${finishedTasks.filter((task) => task.archived).length} `}
          {`- Total: ${finishedTasks.length+tasks.length} `}
          {`- Percentage: ${Math.round(
            (finishedTasks.length / 
            (finishedTasks.length+tasks.length)) * 100)}% `
          }
        </p>       
        {finishedTasks.map((finishedTask, index) => {
          const dayString = getDayString(finishedTask.createdAt);
          return finishedTask.archived === false ? (
            <>
              {!displayedDays.includes(dayString) ? 
                displayedDays.push(dayString) &&
                <h6 className="pt-2 mb-1 text-decoration-underline">{dayString}</h6>
              : ""}
              <span 
                key={index}
                className="my-1 d-flex justify-content-center align-items-center"
              >
                <span>#{index + 1} {finishedTask.name}</span>
                <Button 
                  type="submit"
                  variant="success"
                  size="sm"
                  className="ms-2 reactivate-task"
                  onClick={() => handleShowReactivate(finishedTask.id, finishedTask.name)}
                >
                  <FontAwesomeIcon icon={faArrowUpFromBracket} />
                </Button>
                <Button 
                  className="ms-2"
                  size="sm"
                  onClick={() => handleShow(finishedTask.id)}
                >
                  <FontAwesomeIcon icon={faBoxArchive} />
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
            </>)
          : ""
        })}
        <span className="mt-4">
          <Button 
            type='submit'
            className={
              `border-success
              ${hoverReactivate ? "bg-dark text-success" : "bg-success text-white"}`
            }
            onMouseEnter={toggleHoverReactivate}
            onMouseLeave={toggleHoverReactivate}
            onClick={() => handleShowReactivateAll()}
          >
            <FontAwesomeIcon icon={faArrowUpFromBracket} className='pe-1'/>
            Reactivate All Tasks
          </Button>
        </span>
        <span className="mt-2">
          <Button 
            type='submit'
            className={
              `border-primary
              ${hoverArchive ? "bg-dark text-primary" : "bg-primary text-white"}`
            }
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
            className={
              `border-danger
              ${hover ? "bg-dark text-danger" : "bg-danger text-white"}`
            }
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
        body="Are you sure you want to reactivate all of these tasks?"
        handleClose={handleCloseReactivateAll}
        handleShow={showReactivateAll}
        onConfirm={() => {
          reactivateAll();
          handleCloseReactivateAll();
        }}
        color="success"
        onToggle={() => setSettings({ 
          ...settings,
          askForBulkReactivatingConfirmation: !settings.askForBulkReactivatingConfirmation
        })}
      />
      <ConfirmationModal
        title="Are you sure?"
        body="Are you sure you want to reactivate this task?"
        handleClose={handleCloseReactivate}
        handleShow={showReactivate}
        onConfirm={() => {
          handleReactivate(selectedId, selectedTask);
          handleCloseReactivate();
        }}
        color="success"
        onToggle={() => setSettings({ 
          ...settings,
          askForReactivatingConfirmation: !settings.askForReactivatingConfirmation
        })}
      />
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
