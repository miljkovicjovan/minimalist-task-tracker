import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Stack, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function FinishedTasks({ finishedTasks, tasks, onReset }) {
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);
  return (
    <Stack className="text-center pt-4">
        <hr className="mx-auto w-25"/>
        <h4 className="text-decoration-underline">Finished Tasks &#129321;</h4>
        <p className="text-secondary">
          {`Finished: ${finishedTasks.length} `}
          {`- Total: ${finishedTasks.length+tasks.length} `}
          {`- Percentage: ${Math.round((finishedTasks.length / (finishedTasks.length+tasks.length)) * 100)}% `}
        </p>       
        {finishedTasks.map((finishedTask, index) => (
          <span key={index}>&#x2705; {finishedTask}</span>
        ))}
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
  )
}

export default FinishedTasks;