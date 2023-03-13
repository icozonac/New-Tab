//Set the background image
const random = Math.floor(Math.random() * 3) + 1;
const bg = document.getElementById("bg");
switch (random) {
  case 1:
    bg.style.backgroundImage = "url(/Backgrounds/Background1.png)";
    break;
  case 2:
    bg.style.backgroundImage = "url(/Backgrounds/Background2.png)";
    break;
  case 3:
    bg.style.backgroundImage = "url(/Backgrounds/Background3.png)";
    break;
}
///Check if the user is logged in

if (localStorage.getItem("Name")) {
  document.getElementById("main-container").remove();
  var el = document.createElement("script");
  el.src = "second.js";
  document.body.appendChild(el);
} else {
  //Hide the button
  const button = document.getElementById("btn");
  button.style.visibility = "hidden";

  const input = document.getElementById("input");
  input.addEventListener("input", (e) => {
    const value = e.target.value;
    if (value.length > 2) button.style.visibility = "visible";
    else button.style.visibility = "hidden";
  });
  const capitalizeFirstLetter = (str) =>
    str.substring(0, 1).toUpperCase() + str.substring(1, str.length);

  button.addEventListener("click", () => {
    let getName = document.getElementById("input").value;
    getName = capitalizeFirstLetter(getName);
    localStorage.setItem("Name", getName);

    //Remove page and move to the next page
    const element = document.getElementById("main-container");
    var x = 1;

    function Visible() {
      if (x == 0) {
        clearInterval(t);
        element.remove();
        var el = document.createElement("script");
        el.src = "second.js";
        document.body.appendChild(el);
      }

      x -= 0.25;
      element.style.opacity = x;
      element.style.filter = "alpha(opacity=" - x / 100 - ")";
    }
    var t = setInterval(Visible, 50);
  });
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value;
      if (value.length > 2) button.dispatchEvent(new Event("click"));
    }
  });
}
