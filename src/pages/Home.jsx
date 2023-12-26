import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";
import FinishedTasks from "../components/FinishedTasks";
import Notification from "../components/Notification";

function Home({ settings, setSettings }) {
  const [tasks, setTasks] = useState(
    JSON.parse(
      window.localStorage.getItem("my-minimalistic-tracker-tasks") || "[]"
    )
  );
  const [finishedTasks, setFinishedTasks] = useState(
    JSON.parse(
      window.localStorage.getItem("my-minimalistic-tracker-tasks-finished") || "[]"
    )
  );
  const [message, setMessage] = useState("");

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    setMessage("Task deleted successfully!");
  }

  function completeTask(name, oldId) {
    const createdAt = new Date();
    const id = Math.floor(Math.random() * 1000) + 1;
    const archived = false;
    const data = { id: id, name: name, archived: archived, createdAt: createdAt };
    setFinishedTasks([...finishedTasks, data]);
    setTasks(tasks.filter((task) => task.id !== oldId));
    setMessage("Task completed successfully!");
  }

  function completeAllTasks() {
    let completedTasks = [];
    tasks.forEach((task) => {
      const createdAt = new Date();
      const id = Math.floor(Math.random() * 1000) + 1;
      const archived = false;
      const data = { id: id, name: task.name, archived: archived, createdAt: createdAt };
      completedTasks.push(data);
    });
    setFinishedTasks([...finishedTasks, ...completedTasks]);
    deleteAll();
  }

  function addTask(name) {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...name };
    setTasks([...tasks, newTask]);
    setMessage("Task added successfully!");
  }

  function editTask(name, id) {
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, name: name } : task;
    });
    setTasks(updatedTasks);
    setMessage("Task edited successfully");
  }

  function resetFinishedTask() {
    const updatedFinishedTasks = finishedTasks.filter(task => task.archived !== false);
    setFinishedTasks(updatedFinishedTasks);
  }

  function deleteAll() {
    setTasks([]);
  }

  function archiveTask(id) {
    const updatedTasks = finishedTasks.map((task) => {
      return task.id === id ? { ...task, archived: true } : task;
    });
    setFinishedTasks(updatedTasks);
  }

  useEffect(() => {
    window.localStorage.setItem(
      "my-minimalistic-tracker-tasks",
      JSON.stringify(tasks)
    );
    window.localStorage.setItem(
      "my-minimalistic-tracker-tasks-finished",
      JSON.stringify(finishedTasks)
    );
  }, [tasks, finishedTasks]);
  
  useEffect(() => {
    // Clear the message after 3 seconds
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);
  
    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timer);
  }, [message]);
  
  return (
    <div className="text-white text-center footer-push">
      <AddTask onAdd={addTask} />
      {tasks.length ? (
        <Tasks
          onComplete={completeTask}
          onCompleteAll={completeAllTasks}
          onDelete={deleteTask}
          onEdit={editTask}
          tasks={tasks}
          onDeleteAll={deleteAll}
          settings={settings}
          setSettings={setSettings}
        />
      ) : (
        ""
      )}
      {finishedTasks.some(task => !task.archived) ? (
        <FinishedTasks
          finishedTasks={finishedTasks}
          setFinishedTasks={setFinishedTasks}
          tasks={tasks}
          setTasks={setTasks}
          onReset={resetFinishedTask}
          onArchive={archiveTask}
          settings={settings}
          setSettings={setSettings}
        />
      ) : (
        ""
      )}
      {/* Display the message at the bottom */}
      { message !== "" ? <Notification message={message} /> : ""}
    </div>
  );
}

export default Home;
