const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const DATA_FILE = "./tasks.json";

app.use(cors());
app.use(express.json());

// Helper function to read tasks
function readTasks() {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

// Helper function to write tasks
function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// API: List Tasks
app.get("/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// API: Add Task
app.post("/tasks", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  const tasks = readTasks();
  tasks.push({ id: Date.now(), task });

  writeTasks(tasks);
  res.status(201).json({ message: "Task added" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
