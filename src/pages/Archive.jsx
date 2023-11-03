import { useState, useEffect } from "react";
import { Stack, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../components/ConfirmationModal";

function Archive() {
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);

  const [hoverUnarchive, setHoverUnarchive] = useState(false);
  const toggleHoverUnarchive = () => setHoverUnarchive(!hoverUnarchive);

  const [finishedTasks, setFinishedTasks] = useState(
    JSON.parse(
      window.localStorage.getItem("my-minimalistic-tracker-tasks-finished") ||
        "[]"
    )
  );

  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true); 
    setSelectedTask(id);
  }

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

  const [showUnarchiveAll, setShowUnarchiveAll] = useState(false);
  const handleCloseUnarchiveAll = () => setShowUnarchiveAll(false);
  const handleShowUnarchiveAll = () => setShowUnarchiveAll(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setShowDelete(true); 
    setSelectedTask(id);
  }

  function deleteTask(id) {
    setFinishedTasks(finishedTasks.filter((task) => task.id !== id));
  }

  useEffect(() => {
    window.localStorage.setItem(
      "my-minimalistic-tracker-tasks-finished",
      JSON.stringify(finishedTasks)
    );
  }, [finishedTasks]);
  return (
    <>
      <Stack className="text-white text-center pt-4">
        {finishedTasks.some(task => task.archived === true) ? (
          <>
            <hr className="mx-auto w-25"/>
            <h4 className="text-decoration-underline">Archived Tasks &#128193;</h4>
            {finishedTasks.map((finishedTask, index) => {
              return finishedTask.archived === true ?
                <span key={index} className="my-1">
                  <span>{finishedTask.name}</span>
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
                onClick={() => resetArchivedTasks()}
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
      />
      <ConfirmationModal
        title="Are you sure?"
        body="Are you sure you want to delete this task?"
        handleClose={handleCloseDelete}
        handleShow={showDelete}
        onConfirm={() => {
          deleteTask(selectedTask);
          handleCloseDelete();
        }}
        color="danger"
      />
    </>
  )
}

export default Archive;