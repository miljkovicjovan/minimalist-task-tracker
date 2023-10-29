import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Stack, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoTasks from "./NoTasks";

function FinishedTasks({ finishedTasks, tasks, onReset }) {
  return (
    <Stack className="text-center pt-4">
        <NoTasks/>
        <h4>Finished Tasks &#129321;</h4>
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
            className='bg-danger border-danger text-light w-25'
            onClick={() => onReset()}
          >
              <FontAwesomeIcon icon={faTrashCan} className='pe-1'/>
              Reset Finished Tasks
          </Button>
        </span> 
    </Stack>
  )
}

export default FinishedTasks;