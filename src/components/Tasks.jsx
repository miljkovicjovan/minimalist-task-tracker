import { Stack } from "react-bootstrap";
import Task from "./Task";

function Tasks({tasks, onDelete, onEdit, onComplete}) {
	return (
		<Stack className="my-3 mx-5">
			{tasks.map((task, index) => (
				<Task 
					key={index}
					id={task.id}
					name={task.name}
					onDelete={onDelete}
					onEdit={onEdit}
					onComplete={onComplete}
				/>
			))}
		</Stack>
	)
}

export default Tasks;