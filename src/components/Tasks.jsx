import { Stack } from "react-bootstrap";
import Task from "./Task";
import NoTasks from "./NoTasks";


function Tasks({tasks, onDelete, onEdit, onComplete}) {
	return (
		<Stack className="my-3 mx-5">
			{tasks.length ? 
				(tasks.map((task, index) => (
					<Task 
						key={index}
						id={task.id}
						name={task.name}
						onDelete={onDelete}
						onEdit={onEdit}
						onComplete={onComplete}
					/>
				)))
			: <NoTasks/>}
		</Stack>
	)
}

export default Tasks;