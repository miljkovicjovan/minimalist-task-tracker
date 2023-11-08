import { Stack } from "react-bootstrap";
import Task from "./Task";
import DeleteTasks from "./DeleteTasks";
import CompleteTasks from "./CompleteTasks";

function Tasks({ tasks, onDelete, onEdit, onComplete, onDeleteAll, onCompleteAll, settings, setSettings }) {
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
					onCompleteAll={onCompleteAll}
					onComplete={onComplete}
					settings={settings}
					setSettings={setSettings}
				/>
			))}
			{tasks.length ? 
				<div className="flex row w-20 mx-auto">
					<CompleteTasks onCompleteAll={onCompleteAll} settings={settings} setSettings={setSettings}/>
					<DeleteTasks onDeleteAll={onDeleteAll} settings={settings} setSettings={setSettings}/>
				</div>
			: ""}
		</Stack>
	)
}

export default Tasks;