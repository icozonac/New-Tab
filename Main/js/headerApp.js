//Function
function change(input) {
  const focus_container = document.getElementById("thisdiv");
  focus_container.innerHTML =
    ` 
    <div>
    <p id="today">TODAY</p>
    </div>
    <div class='container-compl'>
    <div>
    <input type ="checkbox" id="checkbox" class="complete">
    </div>
    <p class="todayInput">` +
    input +
    `</p>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" id="delete">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
       </svg>
    </div>
    </div>`;
  //Click/Delete today input
  const btnDeleteToday = document.getElementById("delete");

  btnDeleteToday.addEventListener("click", () => {
    localStorage.removeItem("Today");
    localStorage.removeItem("checkbox");
    changeInitial();
  });

  //Checkbox
  const btnCheckbox = document.getElementById("checkbox");

  btnCheckbox.addEventListener("click", () => {
    const todayInput = document.querySelector(".todayInput");

    if (btnCheckbox.checked == true) {
      todayInput.style.textDecoration = "line-through";
      todayInput.style.opacity = "0.5";
      localStorage.setItem("checkbox", "true");
    } else if (btnCheckbox.checked == false) {
      todayInput.style.textDecoration = "none";
      todayInput.style.opacity = "1";
      localStorage.setItem("checkbox", "false");
    }
  });
}
function changeInitial() {
  const focus_container = document.getElementById("thisdiv");
  focus_container.innerHTML = ` <p id="focus-question">What is your main focus for today?</p>
<input type="text" id="main-focus" autocomplete="off" /> `;

  if (!localStorage.getItem("Today")) {
    const input = document.getElementById("main-focus");

    input.addEventListener("keypress", (e) => {
      if (input.value !== "" && e.key === "Enter") {
        localStorage.setItem("Today", input.value);
        change(input.value);
      }
    });
  } else {
    change(localStorage.getItem("Today"));
  }
}

//Execute
const focus_container = document.getElementById("thisdiv");
focus_container.innerHTML = ` <p id="focus-question">What is your main focus for today?</p>
<input type="text" id="main-focus" autocomplete="off" /> `;

if (!localStorage.getItem("Today")) {
  const input = document.getElementById("main-focus");

  input.addEventListener("keypress", (e) => {
    if (input.value !== "" && e.key === "Enter") {
      localStorage.setItem("Today", input.value);
      change(input.value);
    }
  });
} else {
  change(localStorage.getItem("Today"));
  if (localStorage.getItem("checkbox") == "true") {
    const btnCheckbox = document.getElementById("checkbox");
    const todayInput = document.querySelector(".todayInput");
    btnCheckbox.checked = true;
    todayInput.style.textDecoration = "line-through";
    todayInput.style.opacity = "0.5";
  }
}
//weather
const API_KEY = "1cb74a988a52850c4c8407f1aa9e74a6";
const locationElement = document.getElementById("location");
const iconElement = document.getElementById("icon");
const temperatureElement = document.getElementById("temperature");

// function to get the weather data
function getWeatherData() {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

async function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  try {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const data = await resp.json();

    const location = data.name;
    const temperatureKelvin = data.main.temp;
    const temperatureCelsius = temperatureKelvin - 273.15; // convert from Kelvin to Celsius

    locationElement.innerHTML = location;
    temperatureElement.innerHTML = `${Math.trunc(temperatureCelsius)}°C`;
    iconElement.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
    // console.log(data);
  } catch (error) {
    console.log("sa produs eroare: ", error);
  }
}

function errorCallback(error) {
  console.error(error);
}

// call the getWeatherData() function when the page loads
window.onload = getWeatherData();

// refresh the weather data every 10 minutes
setInterval(getWeatherData, 600000);
