import React, { useState } from "react";
import "./TodoApp.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [song, setSong] = useState("");
  const [singer, setSinger] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (song.trim() !== "" && singer.trim() !== "") {
      setTasks([...tasks, { text: song, singer: singer, completed: false }]);
      setSong("");
      setSinger("");
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });

  return (
    <div className="app">
      <h1>🎵 Music Practice Todo 🎶</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Song name..."
          value={song}
          onChange={(e) => setSong(e.target.value)}
        />
        <input
          type="text"
          placeholder="Singer..."
          value={singer}
          onChange={(e) => setSinger(e.target.value)}
        />
        <button onClick={addTask}>➕ Add</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(index)}>
              {task.text} — <em>{task.singer}</em>
            </span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
