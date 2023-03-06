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

//Links//
const dropupButton = document.querySelector(".link");
const dropupMenu = document.querySelector(".dropup-content");
const addNewLink = document.querySelector(".nwlink");

dropupMenu.style.display = "none";

dropupButton.addEventListener("click", () => {
  if (dropupMenu.style.display === "none") {
    dropupMenu.style.display = "block";
    dropupButton.style.color = "white";
  } else {
    dropupMenu.style.display = "none";
    dropupButton.style.color = "rgb(183, 183, 183)";
  }
});

window.addEventListener("click", (event) => {
  if (!event.target.matches(".link")) {
    dropupMenu.style.display = "none";
    dropupButton.style.color = "rgb(183, 183, 183)";
  }
});
