/* common elements section */

const taskForm = document.querySelector("[data-js='task-form']");
const taskTitleInput = document.querySelector("[data-js='task-title-input']");
const taskCategorySelect = document.querySelector("[data-js='task-category-select']");

const taskList = document.querySelector("[data-js='task-list']");
const emptyTaskMessage = document.querySelector("[data-js='empty-task-message']");
const taskSearchInput = document.querySelector("[data-js='task-search-input']");
const taskFilterSelect = document.querySelector("[data-js='task-filter-select']");

const pendingCount = document.querySelector("[data-js='pending-count']");
const completedCount = document.querySelector("[data-js='completed-count']");

const clearAllBtn = document.querySelector("[data-js='clear-all-btn']");
const themeToggleBtn = document.querySelector("[data-js='theme-toggle-btn']");

const attributeDemoInput = document.querySelector("[data-js='attribute-demo-input']");
const checkAttributeBtn = document.querySelector("[data-js='check-attribute-btn']");

const grandparentBox = document.querySelector("[data-js='grandparent-box']");
const parentBox = document.querySelector("[data-js='parent-box']");
const childBtn = document.querySelector("[data-js='child-btn']");

/* task data section */

let tasks = [];
const TASK_LOCAL_STORAGE_KEY = "task-manager";
const THEME_LOCAL_STORAGE_KEY = "light";

/* task object create section */

function createTaskObject(title, category) {
  return {
    id: Date.now(),
    title,
    category,
    status: "pending",
    createdAt: new Date().toLocaleString(),
  };
}

/* task card create section */

function createTaskCard(task) {
  const article = document.createElement("article");
  article.classList.add("task-card");

  article.dataset.id = task.id;
  article.dataset.status = task.status;
  article.dataset.category = task.category;

  const statusBadge = document.createElement("span");
  statusBadge.classList.add("task-card-status-badge");
  statusBadge.textContent = task.status;

  const taskTitle = document.createElement("h3");
  taskTitle.classList.add("task-card-title");
  taskTitle.textContent = task.title;

  if (task.status === "completed") {
    article.classList.add("task-card-completed");
    statusBadge.classList.add("completed");
  }

  const taskCategory = document.createElement("p");
  taskCategory.classList.add("task-card-category");
  taskCategory.textContent = `Category: ${task.category}`;

  const taskDate = document.createElement("small");
  taskDate.classList.add("task-card-date");
  taskDate.textContent = `Created: ${task.createdAt}`;

  const taskCardAction = document.createElement("div");
  taskCardAction.classList.add("task-card-actions");

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.classList.add("task-card-btn", "task-card-edit-btn");
  editButton.dataset.action = "edit";
  editButton.innerHTML = '<i class="ri-edit-box-line"></i>';

  const completeButton = document.createElement("button");
  completeButton.type = "button";
  completeButton.classList.add("task-card-btn", "task-card-complete-btn");
  completeButton.dataset.action = "complete";
  completeButton.innerHTML = '<i class="ri-check-line"></i>';

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("task-card-btn", "task-card-delete-btn");
  deleteButton.dataset.action = "delete";
  deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i>';

  taskCardAction.append(editButton, completeButton, deleteButton);

  article.append(
    statusBadge,
    taskTitle,
    taskCategory,
    taskDate,
    taskCardAction,
  );

  return article;
}

/* helper functions section */

function findTaskById(taskId) {
  return tasks.find((task) => task.id === taskId);
}

function isDuplicateTask(title, category, currentTaskId = null) {
  return tasks.some((task) => {
    return (
      task.id !== currentTaskId &&
      task.title.toLowerCase() === title.toLowerCase() &&
      task.category.toLowerCase() === category.toLowerCase()
    );
  });
}

function renderTaskCards(taskArray = tasks) {
  const oldTaskCards = taskList.querySelectorAll(".task-card");

  oldTaskCards.forEach((oldCard) => oldCard.remove())

  taskArray.forEach((task) => {
    const taskCard = createTaskCard(task);
    taskList.append(taskCard);
  })

  emptyTaskMessage.style.display = taskArray.length === 0 ? "block" : "none";
}

/* add task section */

function handleTaskFormSubmit(event) {
  event.preventDefault();

  const currentTaskTitle = taskTitleInput.value.trim();
  const currentTaskCategory = taskCategorySelect.value;

  if (!currentTaskTitle) {
    console.log("Please enter task title");
    return;
  }

  if (!currentTaskCategory) {
    console.log("Please select task category");
    return;
  }

  if (isDuplicateTask(currentTaskTitle, currentTaskCategory)) {
    console.log("This task already exists");
    return;
  }

  const taskObject = createTaskObject(currentTaskTitle, currentTaskCategory);

  tasks.push(taskObject);

  saveTasksToLocalStorage();

  renderCurrentTaskView();

  taskForm.reset();

  console.log("Task added:", taskObject);
}

/* event delegation context section */

function getTaskActionContext(event) {
  const actionButton = event.target.closest("[data-action]");

  if (!actionButton) return null;

  const taskCard = actionButton.closest(".task-card");

  if (!taskCard) return null;

  const action = actionButton.dataset.action;
  const taskId = Number(taskCard.dataset.id);

  return {
    action,
    taskId,
    taskCard,
  };
}

/* delete task section */

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);

  saveTasksToLocalStorage();

  renderCurrentTaskView();

  console.log("Task deleted:", taskId);
}

/* complete and pending toggle section */

function toggleCompleteTask(taskId) {
  const currentTask = findTaskById(taskId);

  if (!currentTask) {
    console.log("Task not found");
    return;
  }

  currentTask.status = currentTask.status === "pending" ? "completed" : "pending";

  saveTasksToLocalStorage();

  renderCurrentTaskView();

  console.log("Task status changed:", {
    id: currentTask.id,
    title: currentTask.title,
    status: currentTask.status,
  });
}

/* edit task section */

function editTask(taskId, taskCard) {
  const currentTask = findTaskById(taskId);

  if (!currentTask) {
    console.log("Task not found");
    return;
  }

  const taskTitle = taskCard.querySelector(".task-card-title");

  if (!taskTitle) {
    console.log("Task is already in edit mode");
    return;
  }

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.classList.add("task-card-edit-input");
  editInput.value = currentTask.title;

  taskTitle.replaceWith(editInput);
  editInput.focus();

  let isSaved = false;

  function saveEditedTask() {
    if (isSaved) return;

    const updatedTitle = editInput.value.trim();

    if (!updatedTitle) {
      console.log("Task title cannot be empty");
      editInput.focus();
      return;
    }

    if (isDuplicateTask(updatedTitle, currentTask.category, currentTask.id)) {
      console.log("This task already exists");
      editInput.focus();
      return;
    }

    isSaved = true;

    currentTask.title = updatedTitle;

    saveTasksToLocalStorage();

    renderCurrentTaskView();

    console.log("Task title updated:", {
      id: currentTask.id,
      title: currentTask.title,
    });
  }

  editInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveEditedTask();
    }
  });

  editInput.addEventListener("blur", saveEditedTask);
}

/* task counter section */

function updateTaskCounter(taskArray = tasks) {
  const pendingTask = taskArray.filter((task) => task.status === "pending");
  const completedTask = taskArray.filter((task) => task.status === "completed");

  pendingCount.textContent = pendingTask.length;
  completedCount.textContent = completedTask.length;
}

/* task search section */
function getSearchedTasks() {
  const searchTaskValue = taskSearchInput.value.trim().toLowerCase();

  return tasks.filter((task) => {
    return task.title.toLowerCase().includes(searchTaskValue);
  });
}

function renderCurrentTaskView() {
  const searchedTasks = getSearchedTasks();
  const filteredTasks = getFilteredTasks(searchedTasks);

  renderTaskCards(filteredTasks);
  updateTaskCounter(filteredTasks);
}

function handleTaskSearch() {
  renderCurrentTaskView();
}

/* task filter section */

function getFilteredTasks(taskArray) {
    const selectedCategory = taskFilterSelect.value;

    if(selectedCategory === "all"){
      return taskArray;
    }

    return taskArray.filter((task) => {
      return task.category.toLowerCase() === selectedCategory.toLowerCase();
    })
}

function handleTaskFilter() {
  renderCurrentTaskView();
}

/* clear all tasks section */

function handleClearAllTasks() {
  if (tasks.length === 0) {
    console.log("Task is empty");
    return;
  }

  tasks = [];

  taskSearchInput.value = "";
  taskFilterSelect.value = "all";

  saveTasksToLocalStorage();

  renderCurrentTaskView();

  console.log("All tasks cleared");
}

/* local storage section */

function saveTasksToLocalStorage() {
  localStorage.setItem(TASK_LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem(TASK_LOCAL_STORAGE_KEY);

  if (!savedTasks) {
    tasks = [];
    return;
  }

  try {
    const parsedTasks = JSON.parse(savedTasks);
    tasks = Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    tasks = [];
    localStorage.removeItem(TASK_LOCAL_STORAGE_KEY);
    console.log("Invalid localStorage data removed");
  }

}

/* theme toggle section */

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  themeToggleBtn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";

  themeToggleBtn.classList.toggle("is-dark-theme", theme === "dark");
}

function saveThemeToLocalStorage(theme) {
  localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
}

function loadThemeFromLocalStorage() {
  const savedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);

  if (!savedTheme) {
    applyTheme("light");
    return;
  }

  applyTheme(savedTheme);
}

function handleThemeToggle() {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  saveThemeToLocalStorage(nextTheme);

  console.log("Theme changed:", nextTheme);
}

/* main task action handler section */

function handleTaskAction(event) {
  const taskContext = getTaskActionContext(event);

  if (!taskContext) return;

  const { action, taskId, taskCard } = taskContext;

  if (action === "delete") {
    deleteTask(taskId);
  }

  if (action === "complete") {
    toggleCompleteTask(taskId);
  }

  if (action === "edit") {
    editTask(taskId, taskCard);
  }
}

/* event listeners section */

taskForm.addEventListener("submit", handleTaskFormSubmit);
taskList.addEventListener("click", handleTaskAction);
taskSearchInput.addEventListener("input", handleTaskSearch);
taskFilterSelect.addEventListener("change", handleTaskFilter);
clearAllBtn.addEventListener("click", handleClearAllTasks);
themeToggleBtn.addEventListener("click", handleThemeToggle);

/* initial render */

loadThemeFromLocalStorage();
loadTasksFromLocalStorage();

taskSearchInput.value = "";
taskFilterSelect.value = "all";

renderCurrentTaskView();






