const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "second.css";
document.head.appendChild(link);

window.addEventListener("load", function () {
  const newForm = document.createElement("form");
  document.getElementById("bg").appendChild(newForm);
  newForm.style.opacity = 0;

  newForm.classList.add("container");
  newForm.id = "main-container";

  newForm.innerHTML = `
    <p id="question"></p>
    <input id="input" type="text" autocomplete="off" />
    <div class="btn-container">
    <a id="btn" class="cta" >
        <span>Continue</span>
        <svg width="13px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </a> `;

  //Set input value to variable
  let getName = localStorage.getItem("Name");
  const question = document.getElementById("question");
  question.innerHTML = "What is your email, " + getName + "?";

  //Show new form
  var x = 0;
  function moreVisible() {
    if (x == 1) clearInterval(t);

    x += 0.25;

    newForm.style.opacity = x;
    newForm.style.filter = "alpha(opacity=" - x / 100 - ")";
  }
  var t = setInterval(moreVisible, 50);

  //Add two buttons and styles for them
  //first btn

  const buttonChange = document.createElement("button");
  buttonChange.innerText = "<  Change name";
  buttonChange.className = "twoButton";

  buttonChange.addEventListener("click", () => {
    const changeName = document.createElement("div");
    document.getElementById("bg").appendChild(changeName);
    changeName.id = "divChangeName";
    changeName.innerHTML = `
  <input type="text" id="changeNameInp" autocomplete="off">
  <button type="button" id="changeNameBtn">Change</button>`;

    //Add the functions for the button Change
    const capitalizeFirstLetter = (str) =>
      str.substring(0, 1).toUpperCase() + str.substring(1, str.length);

    const btnChangeName = document.getElementById("changeNameBtn");
    btnChangeName.addEventListener("click", () => {
      getName = document.getElementById("changeNameInp").value;
      getName = capitalizeFirstLetter(getName);
      localStorage.setItem("Name", getName);

      let question = document.getElementById("question");
      question.innerHTML = "";
      question.innerHTML = "What is your email, " + getName + "?";

      const cdiv = document.getElementById("divChangeName");
      cdiv.remove();
    });
  });

  //second btn
  const buttonJump = document.createElement("a");
  buttonJump.innerText = "Stay logged out  >";
  buttonJump.className = "twoButton";
  buttonJump.setAttribute("href", "/Main/principal.html");
  buttonJump.addEventListener("click", () => {
    localStorage.setItem("Email", "NotExist");
  });

  const divForButton = document.createElement("div");
  divForButton.id = "divForButton";
  divForButton.appendChild(buttonChange);
  divForButton.appendChild(buttonJump);
  document.getElementById("bg").appendChild(divForButton);

  //Add the functions for the button Continue
  const btnContinue = document.getElementById("btn");
  btnContinue.addEventListener("click", clickContinue);

  function clickContinue() {
    const email = document.getElementById("input").value;

    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
      localStorage.setItem("Email", email);
      window.location = "/Main/principal.html";
    } else {
      if (document.getElementById("pInvalidEmail")) {
        document.getElementById("pInvalidEmail").remove();
      }
      const paragrapghInvalidEmail = document.createElement("p");
      paragrapghInvalidEmail.id = "pInvalidEmail";
      paragrapghInvalidEmail.innerHTML =
        "Sorry, " +
        email +
        " doesn't seem to be a valid email address. Please try again.";
      const input = document.getElementById("input");
      input.insertAdjacentElement("afterend", paragrapghInvalidEmail);

      input.addEventListener("input", clearInput);
      function clearInput() {
        const alert = document.getElementById("pInvalidEmail");
        if (alert) {
          alert.remove();
        }
      }
    }
  }
});
