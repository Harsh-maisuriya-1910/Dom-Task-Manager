# DOM Task Manager

A clean and interactive **Vanilla JavaScript Task Manager** built to practice DOM manipulation, event delegation, dynamic UI rendering, and task state management without using any frontend framework.

## Overview

DOM Task Manager is a browser-based task management project created with **HTML, CSS, and Vanilla JavaScript**.

The project focuses on core DOM concepts such as dynamic element creation, event delegation, custom `data-*` attributes, form handling, task editing, task deletion, and task status updates.

This project is currently under development.

## Live Demo

Live Link: Coming Soon

## Repository

GitHub Repository: Coming Soon

## Features

### Completed Features

* Add new task
* Validate empty task title
* Validate empty task category
* Prevent duplicate tasks
* Render task cards dynamically
* Delete task
* Toggle task status between pending and completed
* Edit task title
* Show empty message when no tasks are available
* Use event delegation for dynamic task actions
* Use `data-*` attributes for task metadata and button actions

### Upcoming Features

* Pending and completed task counters
* Search tasks
* Filter tasks
* Clear all tasks
* Theme toggle
* Attribute vs Property demo
* Event bubbling and capturing demo
* Browser rendering pipeline section
* LocalStorage support

## Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript

No framework, library, or build tool is required.

## Project Structure

```text
dom-task-manager/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── images/
```

## Core JavaScript Concepts Used

* DOM selection using `querySelector`
* Dynamic element creation using `createElement`
* DOM insertion using `append`
* DOM removal using `remove`
* DOM replacement using `replaceWith`
* Class manipulation using `classList`
* Custom attributes using `dataset`
* Form handling using `submit`
* Event delegation using `closest`
* Task searching using `find`
* Task filtering using `filter`
* Duplicate checking using `some`

## How the Project Works

### Add Task

When the user submits the task form:

1. The default form refresh is stopped using `event.preventDefault()`.
2. Task title and category values are collected.
3. Empty field validation is checked.
4. Duplicate task validation is checked.
5. A new task object is created.
6. A task card is dynamically added to the UI.

Example task object:

```js
{
  id: Date.now(),
  title: "Learn DOM",
  category: "study",
  status: "pending",
  createdAt: "date and time"
}
```

## Task Actions

### Delete Task

When the delete button is clicked:

* The clicked task id is collected from `data-id`
* The task is removed from the `tasks` array
* The task card is removed from the DOM
* Empty message is shown if no task remains

### Complete Task

When the complete button is clicked:

* Pending task becomes completed
* Completed task becomes pending again
* Task status is updated in the array
* Task card `data-status` is updated
* Status badge text is updated
* Completed task title gets line-through style

### Edit Task

When the edit button is clicked:

* Task title is replaced with an input field
* Old task title appears inside the input
* User can update the title
* Updated title is saved on Enter or blur
* Empty and duplicate title validation is checked
* Input is replaced back with a heading element

## Event Delegation

This project uses event delegation for task action buttons.

Instead of adding event listeners to every edit, complete, and delete button separately, one click event is added to the task list.

```js
taskList.addEventListener("click", handleTaskAction);
```

Each action button has a `data-action` attribute:

```html
<button data-action="edit">Edit</button>
<button data-action="complete">Complete</button>
<button data-action="delete">Delete</button>
```

This makes the code cleaner and allows dynamically created task cards to work properly.

## Why `dataset` is Used

Each task card stores important information using custom `data-*` attributes.

Example:

```html
<article
  class="task-card"
  data-id="task-id"
  data-status="pending"
  data-category="study"
>
</article>
```

In JavaScript, these values are accessed using `dataset`.

```js
const taskId = Number(taskCard.dataset.id);
const taskStatus = taskCard.dataset.status;
```

`Number()` is used because `dataset` values are always returned as strings.

## How to Run Locally

Clone the repository:

```bash
git clone https://github.com/your-username/dom-task-manager.git
```

Go to the project folder:

```bash
cd dom-task-manager
```

Open `index.html` in your browser.

No installation is required.

## Git Commit Suggestions

For task action feature:

```bash
git add .
git commit -m "feat: add task actions"
```

For README file:

```bash
git add README.md
git commit -m "docs: add project README"
```

## Roadmap

* Add task counters
* Add search functionality
* Add filter functionality
* Add clear all functionality
* Add theme toggle
* Add localStorage persistence
* Add attribute vs property demo
* Add event propagation demo
* Improve responsive design
* Improve accessibility

## Author

**Harsh Maisuriya**

Created as a Vanilla JavaScript DOM practice project.
