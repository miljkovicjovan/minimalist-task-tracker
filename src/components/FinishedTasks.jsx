import { Stack } from "react-bootstrap";

function FinishedTasks({ finishedTasks}) {
  return (
    <Stack className="text-center pt-4">
        <h4>Finished Tasks &#129321;</h4>
        <p className="text-secondary">
          Finished:{finishedTasks.length}
        </p>       
        {finishedTasks.map((finishedTask, index) => (
          <span key={index}>&#x2705; {finishedTask}</span>
        ))} 
    </Stack>
  )
}

export default FinishedTasks;