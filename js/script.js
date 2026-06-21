const taskForm = document.querySelector("[data-js='task-form']");
const taskTitleInput = document.querySelector("[data-js='task-title-input']");
const taskCategorySelect = document.querySelector(
  "[data-js='task-category-select']",
);

const taskList = document.querySelector("[data-js='task-list']");
const emptyTaskMessage = document.querySelector(
  "[data-js='empty-task-message']",
);
const taskSearchInput = document.querySelector("[data-js='task-search-input']");
const taskFilterSelect = document.querySelector(
  "[data-js='task-filter-select']",
);

const pendingCount = document.querySelector("[data-js='pending-count']");
const completedCount = document.querySelector("[data-js='completed-count']");

const clearAllBtn = document.querySelector("[data-js='clear-all-btn']");
const themeToggleBtn = document.querySelector("[data-js='theme-toggle-btn']");

const attributeDemoInput = document.querySelector(
  "[data-js='attribute-demo-input']",
);
const checkAttributeBtn = document.querySelector(
  "[data-js='check-attribute-btn']",
);

const grandparentBox = document.querySelector("[data-js='grandparent-box']");
const parentBox = document.querySelector("[data-js='parent-box']");
const childBtn = document.querySelector("[data-js='child-btn']");

let tasks = [];

function createTaskObject(title, category) {
  return {
    id: Date.now(),
    title: title,
    category: category,
    status: "pending",
    createdAt: new Date().toLocaleString(),
  };
}

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

  const taskCategory = document.createElement("p");
  taskCategory.classList.add("task-card-category");
  taskCategory.textContent = `Category: ${task.category}`;

  const taskDate = document.createElement("small");
  taskDate.classList.add("task-card-date");
  taskDate.textContent = `Created: ${task.createdAt}`;

  const taskCardAction = document.createElement("div");
  taskCardAction.classList.add("task-card-actions");

  const editButton = document.createElement("button");
  editButton.classList.add("task-card-btn", "task-card-edit-btn");
  editButton.dataset.action = "edit";
  editButton.innerHTML = '<i class="ri-edit-box-line"></i>';

  const completeButton = document.createElement("button");
  completeButton.classList.add("task-card-btn", "task-card-complete-btn");
  completeButton.dataset.action = "complete";
  completeButton.innerHTML = '<i class="ri-check-line"></i>';

  const deleteButton = document.createElement("button");
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

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const currentTaskTitle = taskTitleInput.value.trim();
  const currentTaskCategory = taskCategorySelect.value;

  if (!currentTaskTitle) {
    return "Please enter task title";
  }

  if (!currentTaskCategory) {
    return "Please select task category";
  }

  const taskObject = createTaskObject(currentTaskTitle, currentTaskCategory);

  const isDuplicateTask = tasks.some((task) => {
    return (task.title.toLowerCase() === currentTaskTitle.toLowerCase() && task.category === currentTaskCategory);
  });

  if (isDuplicateTask) {
    console.log("This task already exists");
    return;
  }

  tasks.push(taskObject);

  const taskCard = createTaskCard(taskObject);
  taskList.append(taskCard);

  emptyTaskMessage.style.display = "none";

  taskForm.reset();
});


