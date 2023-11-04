import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";
import FinishedTasks from "../components/FinishedTasks";

function Home() {
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

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completeTask(name, oldId) {
    const id = Math.floor(Math.random() * 1000) + 1;
    const archived = false;
    const data = { id: id, name: name, archived: archived };
    setFinishedTasks([...finishedTasks, data]);
    setTasks(tasks.filter((task) => task.id !== oldId));
  }

  function addTask(name) {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...name };
    setTasks([...tasks, newTask]);
  }

  function editTask(name, id) {
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, name: name } : task;
    });
    setTasks(updatedTasks);
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

  return (
    <div className="text-white text-center">
      <AddTask onAdd={addTask} />
      {tasks.length ? (
        <Tasks
          onComplete={completeTask}
          onDelete={deleteTask}
          onEdit={editTask}
          tasks={tasks}
          onDeleteAll={deleteAll}
        />
      ) : (
        ""
      )}
      {finishedTasks.length ? (
        <FinishedTasks
          finishedTasks={finishedTasks}
          setFinishedTasks={setFinishedTasks}
          tasks={tasks}
          onReset={resetFinishedTask}
          onArchive={archiveTask}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
