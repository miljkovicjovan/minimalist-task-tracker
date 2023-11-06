import { useState, useEffect } from "react";
import { Stack, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faBoxOpen, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../components/ConfirmationModal";
import { Tooltip } from "react-tooltip";

function Archive({ settings, setSettings }) {
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);

  const [hoverUnarchive, setHoverUnarchive] = useState(false);
  const toggleHoverUnarchive = () => setHoverUnarchive(!hoverUnarchive);

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
            <h4 className="text-decoration-underline">Archived Tasks &#128193;</h4>
            {finishedTasks.map((finishedTask, index) => {
              return finishedTask.archived === true ?
                <span key={index} className="my-1 d-flex justify-content-center align-items-center">
                  <span>#{index + 1} {finishedTask.name}</span>
                  <Button className="ms-2" size="sm" variant="primary" onClick={() => handleShow(finishedTask.id)}>
                    <FontAwesomeIcon icon={faBoxOpen} className="pe-1"/>
                    Unarchive Task
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
                  <Button 
                    type="submit"
                    variant="success"
                    size="sm"
                    className="ms-2 reactivate-task"
                    onClick={() => handleReactivate(finishedTask.id, finishedTask.name)}
                  >
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                  </Button>
                  <Tooltip
                    className="d-none d-lg-block"
                    anchorSelect=".reactivate-task"
                    content="Reactivate Task"
                    place="right"
                  />
                </span>
              : ""
            })}
            <span className="mt-4">
              <Button 
                type='submit'
                className={`border-primary ${hoverUnarchive ? "bg-dark text-primary" : "bg-primary text-white"}`}
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
                className={`border-danger ${hover ? "bg-dark text-danger" : "bg-danger text-white"}`}
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