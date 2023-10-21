import { useState } from "react";
import { Stack } from "react-bootstrap";
import Task from "./Task";


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

	return (
		<Stack className="my-3 mx-5">
			{tasks.map((task) => (
				<Task key={task.id} name={task.name}/>
			))}
		</Stack>
	)
}

export default Tasks;