import { useState, useEffect } from "react";
import { Stack, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

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
                <span className="my-1">
                  <span key={index}>{finishedTask.name}</span>
                  <Button className="ms-2" size="sm" variant="primary" onClick={() => handleShow(finishedTask.id)}>
                    <FontAwesomeIcon icon={faBoxOpen} className="pe-1"/>
                    Unarchive Task
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to unarchive this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            unarchive(selectedTask);
            handleClose();
          }}>
            I'm sure
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUnarchiveAll} onHide={handleCloseUnarchiveAll}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to unarchive all of these tasks?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUnarchiveAll}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            unarchiveAll();
            handleCloseUnarchiveAll();
          }}>
            I'm sure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Archive;