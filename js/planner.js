// Academic Planner
// Implements: arrays, functions, DOM manipulation, event handling,
// dynamic content updates, and a working add / complete / delete task flow.
// Tasks are kept in memory (an array of task objects) for the duration of the session.

let tasks = [];
let nextId = 1;

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");
const taskListEl = document.getElementById("task-list");
const emptyState = document.getElementById("emptyState");

const statTotal = document.getElementById("statTotal");
const statPending = document.getElementById("statPending");
const statDone = document.getElementById("statDone");

// Build a task object and add it to the tasks array
function addTask(text, priority, dueDate) {
  const task = {
    id: nextId++,
    text: text,
    priority: priority,
    dueDate: dueDate,
    completed: false
  };
  tasks.push(task);
  renderTasks();
}

// Remove a task from the array by id
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  renderTasks();
}

// Flip a task's completed state
function toggleTask(id) {
  const task = tasks.find(function (task) {
    return task.id === id;
  });
  if (task) {
    task.completed = !task.completed;
  }
  renderTasks();
}

// Format an ISO date string (YYYY-MM-DD) into something readable
function formatDate(dateString) {
  if (!dateString) return "No due date";
  const date = new Date(dateString + "T00:00:00");
  if (isNaN(date.getTime())) return "No due date";
  const options = { day: "numeric", month: "short" };
  return date.toLocaleDateString("en-GB", options);
}

// Build a zero-padded task id label, e.g. TASK-001
function formatTaskId(id) {
  return "TASK-" + String(id).padStart(3, "0");
}

// Rebuild the on-screen task list and stats from the current tasks array
function renderTasks() {
  taskListEl.innerHTML = "";

  if (tasks.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.id = "emptyState";
    empty.textContent = "No tasks yet: add your first one above";
    taskListEl.appendChild(empty);
  } else {
    tasks.forEach(function (task) {
      const row = document.createElement("div");
      row.className = "task-row" + (task.completed ? " done" : "");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", "Mark task complete");
      checkbox.addEventListener("change", function () {
        toggleTask(task.id);
      });

      const taskId = document.createElement("span");
      taskId.className = "task-id";
      taskId.textContent = formatTaskId(task.id);

      const text = document.createElement("span");
      text.className = "task-text";
      text.textContent = task.text;

      const meta = document.createElement("div");
      meta.className = "task-meta";

      const priority = document.createElement("span");
      priority.className = "task-priority" + (task.priority === "high" ? " high" : "");
      priority.textContent = task.priority === "high" ? "High" : "Normal";

      const due = document.createElement("span");
      due.className = "task-due";
      due.textContent = formatDate(task.dueDate);

      meta.appendChild(priority);
      meta.appendChild(due);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "task-delete";
      deleteBtn.setAttribute("aria-label", "Delete task");
      deleteBtn.textContent = "×";
      deleteBtn.addEventListener("click", function () {
        deleteTask(task.id);
      });

      row.appendChild(checkbox);
      row.appendChild(taskId);
      row.appendChild(text);
      row.appendChild(meta);
      row.appendChild(deleteBtn);

      taskListEl.appendChild(row);
    });
  }

  updateStats();
}

// Recalculate and display total / pending / completed counts
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(function (task) {
    return task.completed;
  }).length;
  const pending = total - done;

  statTotal.textContent = total;
  statPending.textContent = pending;
  statDone.textContent = done;
}

// Handle the add-task form submission
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (text === "") {
    taskInput.focus();
    return;
  }

  addTask(text, taskPriority.value, taskDate.value);

  taskForm.reset();
  taskInput.focus();
});

// Initial render on page load
renderTasks();
