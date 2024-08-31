import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

function AddTask({ onAdd, settings }) {
  const [name, setName] = useState("");
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);

  function onSubmit(e) {
    e.preventDefault();

    if (!name) {
      return;
    }

    if (!name.replace(/\s/g, "").length) {
      setName("");
      return;
    }

    onAdd({ name });
    setName("");
  }

  return (
    <form onSubmit={onSubmit} className="pt-4 d-flex justify-content-center">
      <input
        type="text"
        value={name}
        placeholder="Add a Task"
        className={`rounded p-1 me-3 ${settings.askForSwitchDarkMode ? "bg-light text-dark" :"bg-dark text-light" }`}
        style= {{border : settings.askForSwitchDarkMode ? "1px solid black" :"1px solid white" }}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        type="submit"
      className={`add-task ${settings.askForSwitchDarkMode ? "border-dark": "border-light"} 
      ${hover ? (settings.askForSwitchDarkMode ? "bg-white text-dark" : "bg-dark text-white") : 
            (settings.askForSwitchDarkMode ? "bg-dark text-light" : "bg-light text-dark")}`}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        <FontAwesomeIcon icon={faPlus} className="pe-1" />
        task
      </Button>
      <Tooltip
        className="d-none d-lg-block"
        style={{backgroundColor: settings.askForSwitchDarkMode ? "#f8f9fa" : "#212529",
                color: settings.askForSwitchDarkMode ? "black" : "white" }}
        anchorSelect=".add-task"
        content="Add a Task"
        place="right"
      />
    </form>
  );
}

export default AddTask;
