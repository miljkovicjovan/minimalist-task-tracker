import { faTrashCan, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { Stack, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function FinishedTasks({ finishedTasks, tasks, onReset, onArchive }) {
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);

  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true); 
    setSelectedTask(id);
  }

  return (
    <>
      <Stack className="text-center pt-4">
        <hr className="mx-auto w-25"/>
        <h4 className="text-decoration-underline">Finished Tasks &#129321;</h4>
        <p className="text-secondary">
          {`Finished: ${finishedTasks.length} `}
          {`- Total: ${finishedTasks.length+tasks.length} `}
          {`- Percentage: ${Math.round((finishedTasks.length / (finishedTasks.length+tasks.length)) * 100)}% `}
        </p>       
        {finishedTasks.map((finishedTask, index) => {
          return finishedTask.archived === false ?
            <span className="my-1">
              <span key={index}>&#x2705; {finishedTask.name}</span>
              <Button className="ms-2" size="sm" onClick={() => handleShow(finishedTask.id)}>
                <FontAwesomeIcon icon={faBoxArchive} className='pe-1' />
                Archive Task
              </Button>
            </span>
          : ""
        })}
        <span className="mt-4">
          <Button 
            type='submit'
            className={`border-danger ${hover ? "bg-dark text-danger" : "bg-danger text-white"}`}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            onClick={() => onReset()}
          >
              <FontAwesomeIcon icon={faTrashCan} className='pe-1'/>
              Delete Finished Tasks
          </Button>
        </span> 
      </Stack>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to archive this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            onArchive(selectedTask);
            handleClose();
          }}>
            I'm sure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default FinishedTasks;