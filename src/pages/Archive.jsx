import { useState, useEffect } from "react";
import { Stack, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faBoxOpen, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../components/ConfirmationModal";

function Archive({ settings, setSettings }) {
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);

  const [hoverUnarchive, setHoverUnarchive] = useState(false);
  const toggleHoverUnarchive = () => setHoverUnarchive(!hoverUnarchive);

  const [hoverReactivate, setHoverReactivate] = useState(false);
  const toggleHoverReactivate = () => setHoverReactivate(!hoverReactivate);

  const [tasks, setTasks] = useState(
    JSON.parse(
      window.localStorage.getItem("my-minimalistic-tracker-tasks") || "[]"
    )
  );

  const [finishedTasks, setFinishedTasks] = useState(
    JSON.parse(
      window.localStorage.getItem("my-minimalistic-tracker-tasks-finished") || "[]"
    )
  );

  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    if (settings.askForUnarchivingConfirmation) {
      setShow(true); 
      setSelectedTask(id);
    } else unarchive(id);
	};

  const [showUnarchiveAll, setShowUnarchiveAll] = useState(false);
  const handleCloseUnarchiveAll = () => setShowUnarchiveAll(false);
  const handleShowUnarchiveAll = () => {
		settings.askForBulkUnarchivingConfirmation ? setShowUnarchiveAll(true) : unarchiveAll();
	};

  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const handleCloseDeleteAll = () => setShowDeleteAll(false);
	const handleShowDeleteAll = () => {
		settings.askForBulkDeletingConfirmation ? setShowDeleteAll(true) : resetArchivedTasks();
	};

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
		if (settings.askForDeletingConfirmation) {
      setShowDelete(true); 
      setSelectedTask(id);
    } else deleteTask(id);;
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

  function unarchive(id) {
    const updatedTasks = finishedTasks.map((task) => {
      return task.id === id ? { ...task, archived: false } : task;
    });
    setFinishedTasks(updatedTasks);
  }

  function resetArchivedTasks() {
    const updatedFinishedTasks = finishedTasks.filter(task => task.archived === false);
    setFinishedTasks(updatedFinishedTasks);
  }

  function unarchiveAll() {
    const updatedTasks = finishedTasks.map((task) => {
      return { ...task, archived: false }
    });
    setFinishedTasks(updatedTasks);
  }

  function deleteTask(id) {
    setFinishedTasks(finishedTasks.filter((task) => task.id !== id));
  }

  const handleReactivate = (id, name) => {
    const newTask = { id, name };
    setTasks([...tasks, newTask]);
    setFinishedTasks(finishedTasks.filter((task) => task.id !== id));
  }

  const reactivateAll = () => {
    const updatedTasks = [...tasks];
    const tasksToReactivate = finishedTasks.filter(task => task.archived);
  
    tasksToReactivate.forEach(task => {
      updatedTasks.push({ id: task.id, name: task.name });
    });
  
    setTasks(updatedTasks);
    setFinishedTasks(finishedTasks.filter(task => !task.archived));
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

  useEffect(() => {
    window.localStorage.setItem(
      "my-minimalistic-tracker-tasks",
      JSON.stringify(tasks)
    );
    window.localStorage.setItem(
      "my-minimalistic-tracker-tasks-finished",
      JSON.stringify(finishedTasks)
    );
  }, [tasks, finishedTasks]);

  return (
    <>
      <Stack className="text-white text-center pt-4 footer-push">
        {finishedTasks.some(task => task.archived === true) ? (
          <>
            <hr className="mx-auto w-25"/>
            <h4 className="text-decoration-underline mb-1">Archived Tasks &#128193;</h4>
            {finishedTasks.map((finishedTask, index) => {
              const dayString = getDayString(finishedTask.createdAt);
              return finishedTask.archived === true ? (
                <>
                  {!displayedDays.includes(dayString) ? 
                    displayedDays.push(dayString) &&
                    <h6 className="pt-2 mb-1 text-decoration-underline">{dayString}</h6>
                  : ""}
                  <span
                    key={index}
                    className="my-1 d-flex justify-content-center align-items-center"
                  >
                    <span>
                      <span className="text-secondary">
                        #{index + 1 + " "}
                      </span>
                      {finishedTask.name + " "}
                      <i className="text-secondary">
                        {finishedTask.createdAt.slice(11,16)}
                      </i>
                    </span>
                    <Button 
                      type="submit"
                      variant="success"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleShowReactivate(finishedTask.id, finishedTask.name)}
                    >
                      <FontAwesomeIcon icon={faArrowUpFromBracket} />
                    </Button>
                    <Button 
                      className="ms-2"
                      size="sm"
                      variant="primary"
                      onClick={() => handleShow(finishedTask.id)}
                    >
                      <FontAwesomeIcon icon={faBoxOpen} />
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
                  ${hoverUnarchive ? "bg-dark text-primary" : "bg-primary text-white"}`
                }
                onMouseEnter={toggleHoverUnarchive}
                onMouseLeave={toggleHoverUnarchive}
                onClick={() => handleShowUnarchiveAll()}
              >
                <FontAwesomeIcon icon={faBoxOpen} className='pe-1'/>
                Unarchive All Tasks
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
                  Delete Archived Tasks
              </Button>
            </span>
          </>
        ) : "There are currently no archived tasks."}
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
        body="Are you sure you want to unarchive this task?"
        handleClose={handleClose}
        handleShow={show}
        onConfirm={() => {
          unarchive(selectedTask);
          handleClose();
        }}
        color="primary"
        onToggle={() => setSettings({ 
          ...settings,
          askForUnarchivingConfirmation: !settings.askForUnarchivingConfirmation 
        })}
      />
      <ConfirmationModal
        title="Are you sure?"
        body="Are you sure you want to unarchive all of these tasks?"
        handleClose={handleCloseUnarchiveAll}
        handleShow={showUnarchiveAll}
        onConfirm={() => {
          unarchiveAll();
          handleCloseUnarchiveAll();
        }}
        color="primary"
        onToggle={() => setSettings({ 
          ...settings,
          askForBulkUnarchivingConfirmation: !settings.askForBulkUnarchivingConfirmation 
        })}
      />
      <ConfirmationModal
        title="Are you sure?"
        body={<>Are you sure you want to delete all your archived tasks?<br/>
        Once you delete your tasks you cannot get them back!</>}
        handleClose={handleCloseDeleteAll}
        handleShow={showDeleteAll}
        onConfirm={() => {
          resetArchivedTasks();
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

export default Archive;