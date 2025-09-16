import { useState } from "react";
import "./TodoApp.css";

function MusicTodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [category, setCategory] = useState("Practice");
  const [schedule, setSchedule] = useState("None");
  const [time, setTime] = useState("");
  const [filter, setFilter] = useState("all");

  function addTodo() {
    if (newTodo.trim() === "") return;
    setTodos([
      ...todos,
      {
        text: newTodo,
        completed: false,
        category,
        schedule,
        time,
      },
    ]);
    // reset form
    setNewTodo("");
    setCategory("Practice");
    setSchedule("None");
    setTime("");
  }

  function toggleTodo(index) {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  }

  function deleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Progress calculation
  const completedCount = todos.filter((t) => t.completed).length;
  const progress = todos.length ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="app">
      <h1>🎵 Music Todo App</h1>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p>
        {completedCount} / {todos.length} tasks completed
      </p>

      {/* Input */}
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter a music task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Practice</option>
          <option>Song</option>
          <option>Class/Rehearsal</option>
        </select>
        <select value={schedule} onChange={(e) => setSchedule(e.target.value)}>
          <option>None</option>
          <option>Daily</option>
          <option>Weekly</option>
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button className="add-btn" onClick={addTodo}>
          +
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("all")}>All</button>
      </div>

      {/* Todo List */}
      <div className="todo-list">
        {filteredTodos.map((todo, index) => (
          <div key={index} className="todo-card">
            <span className={todo.completed ? "done-text" : ""}>
              {todo.text}
            </span>
            <small>🎯 {todo.category}</small>
            <br />
            {todo.schedule !== "None" && <small>⏰ {todo.schedule}</small>}
            <br />
            {todo.time && <small>🕒 {todo.time}</small>}
            <div className="actions">
              <button className="done-btn" onClick={() => toggleTodo(index)}>
                {todo.completed ? "undo" : "done"}
              </button>
              <button className="delete-btn" onClick={() => deleteTodo(index)}>
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicTodoApp;
