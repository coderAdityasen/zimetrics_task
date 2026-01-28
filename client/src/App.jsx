import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Load tasks on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  }

  async function addTask() {
    if (taskInput.trim() === "") return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: taskInput })
    });

    setTaskInput("");
    fetchTasks(); // Update UI without refresh
  }

  return (
    <div style={styles.container}>
      <h2>📚 Student Task Manager</h2>

      <input
        type="text"
        placeholder="Enter task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        style={styles.input}
      />

      <button onClick={addTask} style={styles.button}>
        Add
      </button>

      <ul style={styles.list}>
        {tasks.map((t) => (
          <li key={t.id} style={styles.item}>
            {t.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif"
  },
  input: {
    padding: "8px",
    width: "70%",
    marginRight: "5px"
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer"
  },
  list: {
    marginTop: "20px"
  },
  item: {
    padding: "6px 0"
  }
};

export default App;
