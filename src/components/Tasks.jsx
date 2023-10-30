import { Stack } from "react-bootstrap";
import Task from "./Task";
import DeleteTasks from "./DeleteTasks";

function Tasks({tasks, onDelete, onEdit, onComplete, onDeleteAll}) {
	return (
		<Stack className="my-3 mx-5">
			{tasks.length ? 
				<>
					<hr className="mx-auto w-25"/>
					<h3 className="text-decoration-underline mb-3">Active tasks &#129488;</h3>
				</> : ""
			}
			{tasks.map((task, index) => (
				<Task 
					key={index}
					id={task.id}
					index={index}
					name={task.name}
					onDelete={onDelete}
					onEdit={onEdit}
					onComplete={onComplete}
				/>
			))}
			{tasks.length ? <DeleteTasks onDeleteAll={onDeleteAll}/> : ""}
		</Stack>
	)
}

export default Tasks;