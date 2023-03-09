//Quotes
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

//Links and todos//
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

//Todo
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
