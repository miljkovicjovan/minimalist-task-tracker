import { useState } from "react";
import { Stack } from "react-bootstrap";
import Task from "./Task";
import NoTasks from "./NoTasks";


function Tasks() {
	const [tasks, setTasks] = useState(
		[
			{
				id: 1,
				name: "Task 1",
			},
			{
				id: 2,
				name: "Task 2",
			},
			{
				id: 3,
				name: "Task 3",
			}
		]
	);

	function deleteTask(id) {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	// TODO make edit function when add form is done
	function editTask(id) {
		console.log(tasks.filter((task) => task.id === id));
	}

	// TODO make complete task function 
	function completeTask(id) {
		console.log(tasks.filter((task) => task.id === id));
	}

	return (
		<Stack className="my-3 mx-5">
			{tasks.length ? 
				(tasks.map((task) => (
					<Task 
						key={task.id}
						id={task.id}
						name={task.name}
						onDelete={deleteTask}
						onEdit={editTask}
						onComplete={completeTask}
					/>
				))
			) : <NoTasks/>}
		</Stack>
	)
}

export default Tasks;