//Watch
function startTime() {
  const today = new Date();
  hours = today.getHours() % 12;
  let m = today.getMinutes();
  let s = today.getSeconds();
  var ampm = today.getHours() >= 12 ? " PM" : " AM";
  hours = hours ? hours : 12;
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("datetime").innerHTML =
    hours + ":" + m + "<span class=ampm>" + ampm + "</span>";

  let getName = localStorage.getItem("Name");
  let p = document.getElementById("say");
  if (hours >= 6 && hours < 10 && ampm === " AM") {
    p.innerText = "Good morning, " + getName + ".";
  } else if ((hours >= 10 && ampm === " AM") || (hours < 6 && ampm === " PM")) {
    p.innerText = "Good afternoon, " + getName + ".";
  } else if (
    (hours >= 6 && ampm === " PM") ||
    (hours === 12 && ampm === " AM") ||
    (hours < 5 && ampm === " AM")
  ) {
    p.innerText = "Good evening, " + getName + ".";
  }
  if (localStorage.getItem("Email") !== "NotExist") {
    let email = document.getElementById("email");
    email.innerText = localStorage.getItem("Email");
  }
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
startTime();
