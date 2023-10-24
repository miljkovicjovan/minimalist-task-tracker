import { Stack } from "react-bootstrap";

function FinishedTasks({ finishedTasks, tasks }) {
  return (
    <Stack className="text-center pt-4">
        <h4>Finished Tasks &#129321;</h4>
        <p className="text-secondary">
          {`Finished: ${finishedTasks.length} `}
          {`- Total: ${finishedTasks.length+tasks.length} `}
          {`- Percentage: ${Math.round((finishedTasks.length / (finishedTasks.length+tasks.length)) * 100)}% `}
        </p>       
        {finishedTasks.map((finishedTask, index) => (
          <span key={index}>&#x2705; {finishedTask}</span>
        ))} 
    </Stack>
  )
}

export default FinishedTasks;