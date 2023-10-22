import { useState } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import "./styles.scss";

function App() {
  const [tasks, setTasks] = useState([]);

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

  function addTask(name) {
    // TODO change name to task for better understanding
    // TODO fix this and make it into a backend server for making and storing the tasks
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...name };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="vh-100 pt-4 bg-dark text-white">
      <Header/>
      <AddTask onAdd={addTask}/>
      <Tasks onComplete={completeTask} onDelete={deleteTask} onEdit={editTask} tasks={tasks}/>
      {/* TODO make this footer better then add it back <Footer/> */}
    </div>
  );
}

export default App;
