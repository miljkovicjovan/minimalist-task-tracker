import { useState } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import FinishedTasks from "./components/FinishedTasks";
// TODO uncomment when footer is done import Footer from "./components/Footer";
import "./styles.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);

	function deleteTask(id) {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	function completeTask(name, id) {
    setFinishedTasks([...finishedTasks, name]);
    setTasks(tasks.filter((task) => task.id !== id));
	}

  function addTask(name) {
    // TODO change name to task for better understanding
    // TODO fix this and make it into a backend server for making and storing the tasks
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...name };
    setTasks([...tasks, newTask]);
  }

  function editTask(name, id) {
    // TODO change name to task for better understanding
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, name: name } : task;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="vh-100 pt-4 bg-dark text-white">
      <Header/>
      <AddTask onAdd={addTask}/>
      <Tasks onComplete={completeTask} onDelete={deleteTask} onEdit={editTask} tasks={tasks}/>
      {finishedTasks.length ?
        <FinishedTasks finishedTasks={finishedTasks} tasks={tasks}/> : ''        
      }
      {/* TODO make this footer better then add it back <Footer/> */}
    </div>
  );
}

export default App;
