# DOM Task Manager

A professional Vanilla JavaScript DOM Task Manager project built to practice real-world DOM manipulation, event handling, event delegation, localStorage persistence, theme switching, modular JavaScript, and browser rendering concepts.

This project is designed as a beginner-to-intermediate JavaScript project where every feature is built using pure HTML, CSS, and Vanilla JavaScript without any external JavaScript framework.

---

## Live Demo

Live Project: `Add your Vercel deployment link here`

GitHub Repository: [DOM Task Manager](https://github.com/Harsh-maisuriya-1910/Dom-Task-Manager)

---

## Project Preview

Add your project screenshot here:

```md
![DOM Task Manager Preview](./assets/project-preview.png)
```

---

## Features

### Core Task Manager Features

* Add new tasks with title and category
* Display tasks dynamically using JavaScript
* Edit existing task titles
* Delete individual tasks
* Toggle task status between pending and completed
* Prevent duplicate tasks within the same category
* Show pending and completed task counters
* Search tasks by title
* Filter tasks by category
* Clear all tasks

### Advanced JavaScript Features

* localStorage integration for persistent task data
* Dark and light theme toggle
* Theme persistence using localStorage
* Event delegation using `data-action`
* Dynamic UI creation using `createElement`
* Attribute vs Property demo
* Event propagation demo with capturing and bubbling
* Browser rendering pipeline section generated dynamically
* DocumentFragment optimization for better DOM rendering performance
* Modular JavaScript using `import` and `export`

---

## Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript
* LocalStorage API
* DOM API
* ES Modules
* Git and GitHub
* Vercel for deployment

---

## JavaScript Concepts Covered

This project covers important JavaScript and browser concepts:

* DOM selection using `querySelector`
* Dynamic element creation using `createElement`
* Appending elements using `append`
* Updating UI with data-driven rendering
* Event handling
* Event delegation
* `dataset` and custom `data-*` attributes
* `classList`
* `setAttribute`, `getAttribute`, `hasAttribute`, `removeAttribute`
* `localStorage.setItem`
* `localStorage.getItem`
* `JSON.stringify`
* `JSON.parse`
* Event bubbling
* Event capturing
* DocumentFragment
* Modular JavaScript using `import` and `export`

---

## Project Folder Structure

```txt
dom-task-manager/
├── index.html
├── README.md
├── CODE_MISTAKES_AND_LEARNINGS.md
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── data/
│       └── rendering-pipeline.data.js
└── assets/
    └── project-preview.png
```

---

## How to Run This Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Harsh-maisuriya-1910/Dom-Task-Manager.git
```

### 2. Open the project folder

```bash
cd Dom-Task-Manager
```

### 3. Run the project

Open `index.html` directly in the browser.

Recommended: use the VS Code Live Server extension for a better development experience.

---

## Main Functional Flow

### Task Flow

```txt
User adds a task
↓
Task object is created
↓
Task is pushed into the tasks array
↓
Tasks are saved into localStorage
↓
UI is re-rendered dynamically
```

### Page Refresh Flow

```txt
Page loads
↓
Theme is loaded from localStorage
↓
Tasks are loaded from localStorage
↓
Search and filter values are reset
↓
Task list is rendered again
```

### Search and Filter Flow

```txt
All tasks
↓
Search by task title
↓
Filter by task category
↓
Render visible tasks
↓
Update visible pending/completed counters
```

---

## Important Features Explained

### localStorage Persistence

Tasks are saved in the browser using localStorage, so they remain available even after refreshing the page.

```js
localStorage.setItem("task-manager", JSON.stringify(tasks));
```

---

### Dark and Light Theme

The project uses the `data-theme` attribute on the `html` element.

```html
<html data-theme="light">
```

JavaScript updates the theme dynamically:

```js
document.documentElement.setAttribute("data-theme", "dark");
```

The selected theme is also saved in localStorage so the user’s theme preference remains after refresh.

---

### Event Delegation

Instead of adding separate event listeners to every task button, one event listener is added to the task list container.

```js
taskList.addEventListener("click", handleTaskAction);
```

Button actions are identified using `data-action`.

```html
<button data-action="delete">Delete</button>
```

This makes the task actions work even for dynamically created task cards.

---

### DocumentFragment Optimization

Task cards are first added into a `DocumentFragment`, then appended to the real DOM in one operation.

```js
const taskFragment = document.createDocumentFragment();
taskList.append(taskFragment);
```

This reduces repeated DOM updates and improves rendering performance.

---

## Browser Rendering Pipeline

The project includes a dynamically generated visual browser rendering pipeline:

```txt
HTML Document
↓
HTML Parsing
↓
HTML Tokenization
↓
DOM Tree Creation

CSS Stylesheet
↓
CSSOM Tree Creation

DOM + CSSOM Combination
↓
Render Tree Generation
↓
Layout Calculation
↓
Paint Process
↓
Compositing
```

This helps students understand how the browser converts HTML and CSS into pixels on the screen.

---

## Testing Checklist

All major features have been tested successfully.

* [x] Add task works correctly
* [x] Empty task validation works
* [x] Category validation works
* [x] Duplicate task prevention works
* [x] Edit task works
* [x] Delete task works
* [x] Complete/Pending toggle works
* [x] Search works
* [x] Category filter works
* [x] Counters update correctly
* [x] Clear All works
* [x] Tasks persist after refresh
* [x] Dark/Light theme works
* [x] Theme persists after refresh
* [x] Attribute vs Property demo logs correct output
* [x] Event propagation demo logs capturing and bubbling order
* [x] Browser Rendering Pipeline renders correctly
* [x] DocumentFragment rendering works correctly
* [x] No console errors
* [x] Responsive design works on mobile and desktop

---

## Git Workflow Used

This project follows a feature-branch Git workflow.

```txt
main
↓
dev
↓
feature branches
```

Example branches used in this project:

```txt
feature/add-task
feature/task-search
feature/task-filter
feature/local-storage
feature/theme-toggle
feature/attribute-property-demo
feature/event-propagation-demo
feature/rendering-pipeline-polish
feature/document-fragment-optimization
feature/readme-update
docs/code-mistakes-learnings
```

---

## Deployment

This project is prepared for deployment on Vercel.

After deployment, update the live project link in the `Live Demo` section.

Recommended platform:

```txt
Vercel
```

---

## Future Improvements

* Add task priority levels
* Add due dates
* Add drag-and-drop task sorting
* Add task statistics dashboard
* Add toast notifications instead of console messages
* Add confirmation modal before clearing all tasks
* Add export/import tasks feature

---

## Author

**Harsh Maisuriya**

Full Stack Developer | JavaScript & MERN Stack Instructor

GitHub: [Harsh-maisuriya-1910](https://github.com/Harsh-maisuriya-1910)
LinkedIn: [Harsh Maisuriya](https://www.linkedin.com/in/harsh-maisuriya-b02783276/)

---

## Usage

This project is created for learning, teaching, and portfolio purposes.

You are free to use this project as a reference for understanding Vanilla JavaScript DOM concepts.

---

## License

No license has been added to this project.

This project is created for learning and portfolio purposes.
