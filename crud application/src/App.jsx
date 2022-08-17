import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Input, Button } from "reactstrap";

function App() {
  //states section
  const [task, settask] = useState([]);
  const [updatetask, setupdatetask] = useState([]);
  const [newtask, setnewtask] = useState("");
  const [toggleButton, settoggleButton] = useState(true);
  const [search, setsearch] = useState("");

  //function for add the task
  const handleAddTask = (e) => {
    const taskobj = {
      id: new Date().getTime(),
      title: newtask,
    };

    {
      taskobj.title === ""
        ? alert("Please enter the task")
        : settask([...task, taskobj]);
      setnewtask("");
    }
  };

  //function for remove the task
  const handleRemoveTask = (id) => {
    settask(
      task.filter((item) => {
        return item.id !== id;
      })
    );
  };

  //function for edit the task
  const handleEditTask = (item) => {
    settoggleButton(false);
    setupdatetask(item);
    const editedtask = task.find((elem) => {
      return elem.id === item.id ? elem.title : null;
    });
    setnewtask(editedtask.title);
  };

  //function for update the task
  const handleUpdateTask = () => {
    settoggleButton(true);
    task.some((item) => {
      return updatetask.id == item.id ? (item.title = newtask) : null;
    });
    setnewtask("");
  };

  return (
    <>
      <div className="top">
        <Input
          placeholder="Enter the task"
          value={newtask}
          onChange={(e) => {
            setnewtask(e.target.value);
          }}
        />
        {toggleButton ? (
          <Button color="success" onClick={handleAddTask}>
            Add Task
          </Button>
        ) : (
          <Button color="primary" onClick={handleUpdateTask}>
            Update Task
          </Button>
        )}
      </div>

      <div className="bottom">
        <h1>Task List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        {task.map((item) => {
          return (
            <div className="task" key={item.id}>
              {item.title}
              <div className="buttons">
                <Button
                  color="danger"
                  onClick={() => {
                    handleRemoveTask(item.id);
                  }}
                >
                  Remove
                </Button>
                <Button
                  color="info"
                  onClick={() => {
                    handleEditTask(item);
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
