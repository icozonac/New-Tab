const d = new Date();
let day = d.getDay();

switch (day) {
  case 0:
    document.getElementById("bg").style.backgroundImage =
      "url(./bg/Darkness/1.jpg)";
    break;
  case 1:
    document.getElementById("bg").style.backgroundImage =
      "url(./bg/Darkness/2.jpg)";
    break;
  case 2:
    document.getElementById("bg").style.backgroundImage =
      "url(./bg/Darkness/3.jpg)";
    break;
  case 3:
    document.getElementById("bg").style.backgroundImage =
      "url(./bg/Darkness/4.jpg)";
    break;
  case 4:
    document.getElementById("bg").style.backgroundImage =
      "url(./bg/Darkness/5.jpg)";
    break;
  case 5:
    document.getElementById("bg").style.backgroundImage =
      "url(./bg/Darkness/6.jpg)";
    break;
  case 6:
    document.getElementById("bg").style.backgroundImage =
      "url(./bg/Darkness/7.jpg)";
    break;
}

