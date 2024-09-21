// Get necessary DOM elements
const taskInput = document.querySelector<HTMLInputElement>(".task-input input");
const addButton = document.querySelector<HTMLButtonElement>(".add-btn");
const tasksList = document.querySelector<HTMLUListElement>(".tasks-list");

// Function to create a new task
function createTask(taskText: string) {
  if (!tasksList) return;

  const taskItem = document.createElement("li");
  taskItem.classList.add("task");

  taskItem.innerHTML = `
        <div class="task-pending"></div>
        <span class="task-text">${taskText}</span>
        <div class="task-actions">
            <button class="edit-btn">&#9998;</button>
            <button class="delete-btn">&#128465;</button>
        </div>
    `;

  // Add event listeners for the task actions (edit, delete)
  const deleteButton = taskItem.querySelector(".delete-btn");
  const editButton = taskItem.querySelector(".edit-btn");

  // Handle delete functionality
  deleteButton?.addEventListener("click", () => {
    taskItem.remove();
  });

  // Handle edit functionality
  editButton?.addEventListener("click", () => {
    const taskTextSpan = taskItem.querySelector(".task-text");
    if (taskTextSpan) {
      const currentText = taskTextSpan.textContent || "";
      const newTaskText = prompt("Edit task:", currentText);
      if (newTaskText) {
        taskTextSpan.textContent = newTaskText;
      }
    }
  });

  // Append task to the list
  tasksList.appendChild(taskItem);
}

// Add new task on button click
addButton?.addEventListener("click", () => {
  if (taskInput?.value) {
    createTask(taskInput.value);
    taskInput.value = ""; // Clear input field after task is added
  }
});

// Optional: Add functionality for Enter keypress to add task
taskInput?.addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === "Enter" && taskInput?.value) {
    createTask(taskInput.value);
    taskInput.value = ""; // Clear input field after task is added
  }
});
