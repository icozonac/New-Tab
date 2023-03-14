/////////////////////Quotes
let quote = document.querySelector(".quotes");
const btn = document.getElementById("switcher");
const url = "https://api.quotable.io/random";
let getQuote = () => {
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      quote.innerText = item.content;
    });
};
window.addEventListener("load", getQuote);
btn.addEventListener("click", getQuote);

///////////////////Links
const dropupLink = document.querySelector(".link");
const dropupMenu = document.querySelector(".dropup-content");
const addNewLink = document.querySelector(".nwlink");

dropupMenu.style.display = "none";

dropupLink.addEventListener("click", () => {
  if (dropupMenu.style.display === "none") {
    dropupMenu.style.display = "block";
    dropupLink.style.color = "white";
  } else {
    dropupMenu.style.display = "none";
    dropupLink.style.color = "rgb(183, 183, 183)";
  }
});

window.addEventListener("click", (event) => {
  if (!event.target.matches(".link")) {
    dropupMenu.style.display = "none";
    dropupLink.style.color = "rgb(183, 183, 183)";
  }
});

///////////////Todo
const dropupTodo = document.querySelector(".todo");
const dropupTodoMenu = document.querySelector(".dropup-todo");
const addNewTodo = document.getElementById("inputTodo");

dropupTodoMenu.style.display = "none";

dropupTodo.addEventListener("click", () => {
  if (dropupTodoMenu.style.display === "none") {
    dropupTodoMenu.style.display = "block";
    dropupTodo.style.color = "white";
  } else {
    dropupTodoMenu.style.display = "none";
    dropupTodo.style.color = "rgb(183, 183, 183)";
  }
});

window.onload = loadTasks;

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks !== null) {
    tasks = Array.from(tasks);
    tasks.forEach((task) => {
      const list = document.querySelector("ol");
      const li = document.createElement("li");
      li.innerHTML = `<div>
                      <input type="checkbox" class="checkbox" />
                    </div>
                    <span>${task.task}</span>
                    <div>
                      <button class="deleteTask">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          class="delete"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>`;
      list.insertBefore(li, list.childNodes[0]);

      // add event listener for delete button
      const deleteButton = li.querySelector(".deleteTask");
      deleteButton.addEventListener("click", () => {
        const taskText = li.querySelector("span").textContent;
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const filteredTasks = tasks.filter((task) => task.task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(filteredTasks));
        li.remove();
      });

      const checkbox = li.querySelector(".checkbox");
      if (task.completed) {
        li.classList.add("completed");
        checkbox.checked = true;
      }
      //add event listener for checkbox

      checkbox.addEventListener("click", () => {
        const taskText = li.querySelector("span").textContent;
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach((task) => {
          if (task.task === taskText) {
            task.completed = !task.completed;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        li.classList.toggle("completed");
      });
    });
  }
}

function addTask() {
  const task = document.getElementById("inputTodo");
  const list = document.querySelector("ol");

  if (task.value === "") {
    alert("Please add some task!");
    return false;
  }
  // check is task already exist
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  // task already exist
  if (tasks.some((taskItem) => taskItem.task === task.value)) {
    alert("Task already exist!");
    task.value = "";
    return false;
  }

  // add task to local storage
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: task.value, completed: false },
    ])
  );

  // create li element
  const li = document.createElement("li");
  li.innerHTML = `                  
<div>
  <input type="checkbox" class="checkbox" />
</div>
<span>${task.value}</span>
<div>
  <button class="deleteTask">  
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      class="delete"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </button>
</div>`;
  list.insertBefore(li, list.childNodes[0]);

  task.value = "";
  // add event listener for delete button
  const deleteButton = li.querySelector(".deleteTask");
  deleteButton.addEventListener("click", () => {
    const taskText = li.querySelector("span").textContent;
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const filteredTasks = tasks.filter((task) => task.task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    li.remove();
  });
  //add event listener for checkbox
  const checkbox = li.querySelector(".checkbox");
  checkbox.addEventListener("click", () => {
    const taskText = li.querySelector("span").textContent;
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
      if (task.task === taskText) {
        task.completed = !task.completed;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.classList.toggle("completed");
  });
}

const input = document.getElementById("inputTodo");
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
