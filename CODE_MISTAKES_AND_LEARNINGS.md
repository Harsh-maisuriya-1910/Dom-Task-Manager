# Code Mistakes and Learnings

This file documents the important mistakes I made while building the DOM Task Manager project and what I learned from each mistake.

The purpose of this file is to track my debugging journey and improve my coding habits.

---

## 1. Creating Array Before Taking Input

### Mistake

In earlier practice, I created an array before taking row and column input.

### Problem

The array size was not known at the time of declaration, so the program could behave incorrectly.

### Learning

Always take required input first, then create the array or data structure.

---

## 2. Direct DOM Update Instead of Data-Driven Rendering

### Mistake

At the beginning, I was directly appending task cards to the DOM after creating a task.

```js
taskList.append(taskCard);
```

### Problem

When search, filter, delete, complete, and edit features were added, direct DOM update became difficult to manage.

### Learning

The `tasks` array should be the single source of truth.

Correct flow:

```txt
Update tasks array
↓
Save if needed
↓
Render UI again
```

---

## 3. Wrong Duplicate Task Check

### Mistake

I tried to check duplicate tasks using `includes()`.

```js
tasks.includes(taskObject.title)
```

### Problem

`tasks` is an array of objects, not an array of strings. So `includes()` could not correctly check duplicate task titles.

### Learning

Use `some()` when checking inside an array of objects.

```js
tasks.some((task) => task.title.toLowerCase() === title.toLowerCase());
```

---

## 4. Duplicate Check Without Category

### Mistake

At first, I checked duplicate tasks only by title.

### Problem

The same task title could be valid in a different category.

Example:

```txt
HTML Notes - study
HTML Notes - work
```

Both should be allowed.

### Learning

Duplicate check should compare both title and category.

```js
task.title.toLowerCase() === title.toLowerCase() &&
task.category.toLowerCase() === category.toLowerCase()
```

---

## 5. Counter Showing Wrong Count During Search and Filter

### Mistake

The counter was using the full `tasks` array instead of the visible filtered array.

```js
const pendingTask = tasks.filter(...)
```

### Problem

When I searched or filtered tasks, the counter still showed total task count instead of visible task count.

### Learning

Pass the visible task array into the counter function.

```js
updateTaskCounter(filteredTasks);
```

Correct function:

```js
function updateTaskCounter(taskArray = tasks) {
  const pendingTask = taskArray.filter((task) => task.status === "pending");
  const completedTask = taskArray.filter((task) => task.status === "completed");

  pendingCount.textContent = pendingTask.length;
  completedCount.textContent = completedTask.length;
}
```

---

## 6. Search and Filter Flow Confusion

### Mistake

I was not clear whether filter should run on all tasks or searched tasks.

### Problem

Search and filter did not work together properly.

### Learning

Correct flow:

```txt
tasks
↓
search by title
↓
filter by category
↓
render final visible tasks
↓
update counter
```

Correct function:

```js
function renderCurrentTaskView() {
  const searchedTasks = getSearchedTasks();
  const filteredTasks = getFilteredTasks(searchedTasks);

  renderTaskCards(filteredTasks);
  updateTaskCounter(filteredTasks);
}
```

---

## 7. Clear All LocalStorage Bug

### Mistake

Inside `handleClearAllTasks()`, I called `loadTasksFromLocalStorage()` after setting `tasks = []`.

```js
tasks = [];

loadTasksFromLocalStorage();

saveTasksToLocalStorage();
```

### Problem

After clearing tasks, old tasks were loaded again from localStorage and saved again.

### Learning

Never load old data while clearing all data.

Correct flow:

```txt
tasks = []
↓
save empty array to localStorage
↓
render empty UI
```

Correct code:

```js
function handleClearAllTasks() {
  tasks = [];

  taskSearchInput.value = "";
  taskFilterSelect.value = "all";

  saveTasksToLocalStorage();
  renderCurrentTaskView();
}
```

---

## 8. Forgetting to Save After Updating Tasks

### Mistake

At first, I updated the `tasks` array but did not call `saveTasksToLocalStorage()` everywhere.

### Problem

After page refresh, changes were lost.

### Learning

Whenever the `tasks` array changes, save it.

Required places:

```txt
Add task
Delete task
Complete/Pending toggle
Edit task
Clear all tasks
```

Correct flow:

```txt
Update tasks array
↓
saveTasksToLocalStorage()
↓
renderCurrentTaskView()
```

---

## 9. Initial Render Order Mistake

### Mistake

I rendered tasks before loading them from localStorage.

### Problem

The UI rendered empty tasks first.

### Learning

Always load saved data first, then render UI.

Correct order:

```js
loadTasksFromLocalStorage();

taskSearchInput.value = "";
taskFilterSelect.value = "all";

renderCurrentTaskView();
```

---

## 10. Browser Retaining Old Search or Filter Values

### Mistake

After refresh, sometimes old search or filter values were still present in the browser.

### Problem

Saved tasks existed, but they were hidden because search/filter still had old values.

### Learning

Reset search and filter before initial render.

```js
taskSearchInput.value = "";
taskFilterSelect.value = "all";
```

---

## 11. Completed Badge Class Missing

### Mistake

CSS had a completed badge style, but JavaScript was not adding the `completed` class to the status badge.

### Problem

Completed task badge was not getting the correct completed style.

### Learning

If CSS class exists, JavaScript must apply it when required.

```js
if (task.status === "completed") {
  article.classList.add("task-card-completed");
  statusBadge.classList.add("completed");
}
```

---

## 12. Unused Functions Kept in Code

### Mistake

Some old helper functions stayed in the code even after the rendering system changed.

Examples:

```js
toggleEmptyTaskMessage()
createTaskTitleElement()
```

### Problem

Unused code makes the project confusing and harder to maintain.

### Learning

Remove unused code after refactoring.

Clean code should contain only the functions that are actually used.

---

## 13. Static HTML Instead of Dynamic JavaScript Rendering

### Mistake

Browser Rendering Pipeline section was first written directly in HTML.

### Problem

It did not fully show DOM manipulation skills.

### Learning

For a DOM project, dynamic UI should be created using JavaScript where possible.

Correct approach:

```txt
Data array
↓
createElement()
↓
append()
↓
DocumentFragment
↓
Render UI
```

---

## 14. Forgetting `type="module"` for Import and Export

### Mistake

When I moved rendering pipeline data into a separate file, I needed to use `import` and `export`.

### Problem

Normal script tag does not support ES module imports properly.

### Learning

When using import/export, script tag must include `type="module"`.

```html
<script type="module" src="./js/script.js"></script>
```

---

## 15. Direct DOM Append Without DocumentFragment

### Mistake

Task cards were appended directly to the real DOM one by one.

```js
taskList.append(taskCard);
```

### Problem

For many cards, repeated DOM updates are less efficient.

### Learning

Use `DocumentFragment` for better rendering performance.

```js
const taskFragment = document.createDocumentFragment();

taskArray.forEach((task) => {
  const taskCard = createTaskCard(task);
  taskFragment.append(taskCard);
});

taskList.append(taskFragment);
```

---

## 16. Event Delegation Understanding

### Mistake

At first, I was thinking of adding separate event listeners to every task button.

### Problem

Dynamic buttons are created after page load, so managing individual listeners becomes difficult.

### Learning

Use event delegation on the parent container.

```js
taskList.addEventListener("click", handleTaskAction);
```

Then detect action using:

```js
event.target.closest("[data-action]");
```

---

## 17. Event Propagation Confusion

### Mistake

Capturing and bubbling order was confusing at first.

### Learning

Capturing phase goes top to bottom:

```txt
Grandparent → Parent → Child
```

Bubbling phase goes bottom to top:

```txt
Child → Parent → Grandparent
```

Capturing listener:

```js
element.addEventListener("click", handler, true);
```

Bubbling listener:

```js
element.addEventListener("click", handler);
```

---

## 18. Attribute vs Property Confusion

### Mistake

I thought `input.value` and `getAttribute("value")` were always the same.

### Problem

They can show different values after the user types something.

### Learning

`input.value` gives the current live value.

```js
attributeDemoInput.value;
```

`getAttribute("value")` gives the original HTML attribute value.

```js
attributeDemoInput.getAttribute("value");
```

---

## 19. Git Branch Workflow Mistakes

### Mistake

Sometimes I forgot to create a feature branch before changing files.

### Problem

Changes could happen directly on `dev`, making workflow confusing.

### Learning

Use one feature branch for one feature.

Correct flow:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/feature-name
```

After feature completion:

```bash
git add .
git commit -m "feat: feature message"
git push -u origin feature/feature-name
```

Then merge into `dev`.

---

## 20. Main Project Learning

The biggest learning from this project:

```txt
Data should control the UI.
UI should not control the data.
```

Correct professional flow:

```txt
User action
↓
Update data
↓
Save data if needed
↓
Render UI again
```

This project helped me understand real-world Vanilla JavaScript, DOM manipulation, debugging, Git workflow, and clean project structure.
