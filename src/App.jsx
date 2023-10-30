import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import FinishedTasks from "./components/FinishedTasks";
import Footer from "./components/Footer";
import "./styles.scss";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(
      window.localStorage.getItem('my-minimalistic-tracker-tasks') || "[]"
    )
  );
  const [finishedTasks, setFinishedTasks] = useState(
    JSON.parse(
      window.localStorage.getItem('my-minimalistic-tracker-tasks-finished') || "[]"
    )
  );

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

  function resetFinishedTask() {
    setFinishedTasks([]);
  }

  function deleteAll() {
    setTasks([]);
  }

  useEffect(() => {
    window.localStorage.setItem('my-minimalistic-tracker-tasks', JSON.stringify(tasks));
    window.localStorage.setItem('my-minimalistic-tracker-tasks-finished', JSON.stringify(finishedTasks));
  }, [tasks, finishedTasks]);

  return (
    <div className="pt-4 text-white text-center">
      <Header/>
      <AddTask onAdd={addTask}/>
      <Tasks onComplete={completeTask} onDelete={deleteTask} onEdit={editTask} tasks={tasks} onDeleteAll={deleteAll}/>
      {finishedTasks.length ?
        <FinishedTasks finishedTasks={finishedTasks} tasks={tasks} onReset={resetFinishedTask}/> : ''        
      }
      <Footer/>
    </div>
  );
}

export default App;
