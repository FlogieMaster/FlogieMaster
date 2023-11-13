"use strict";

let color_main = "rgb(255, 255, 255)";
let color_background = "rgb(0, 0, 0)";
var timedublepointsmall = ":";
var timedublepointbig = " : ";
let dictionarySettings = JSON.parse(
  localStorage.getItem("dictionarySettings")
) || { Color: "white", Backgroundcolor: "black", clocksettings: [0, 0, 1, 1] };
var r = document.querySelector(":root");
let clockids = ["#day", "#year", "#hour", "#second"];
let loadclock = "false";

function google() {
  console.log(searchinput.value);
  if (searchinput.value.includes(".")) {
    if (
      searchinput.value.includes("www") ||
      searchinput.value.includes("https://")
    ) {
      searchinput.value.includes("www")
        ? open("https://" + searchinput.value)
        : open(searchinput.value);
    } else {
      open("https://" + searchinput.value);
    }
  } else {
    open("https://google.com/search?q=" + searchinput.value);
  }
  searchinput.value = "";
  searchinput.select();
}

function onstart() {
  loadclock = "true";
  color_main = dictionarySettings["Color"];
  color_background = dictionarySettings["Backgroundcolor"];
  body.innerHTML =
    '<div class="position"><svg xmlns="http://www.w3.org/2000/svg" id="settings" onclick="gotosettings();" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"/></svg></div><div class="clock" id="clock"><span id="clockid">00:00:00</span></div><form onsubmit="google();" id="maincontent"><h1><input class="search" type="text" id="searchinput" autocomplete="off" autofocus></h1></form>';
  checkclocksettingsexist();
  maincontent.innerHTML =
    '<h1><input class="search" type="text" id="searchinput" autocomplete="off"></h1>';
  r.style.setProperty("--maincolor", color_main);
  r.style.setProperty("--backgroundcolor", color_background);
  clock();
  searchinput.select();
}

function settings_maincolor() {
  color_main = main_color_input.value;
  dictionarySettings["Color"] = main_color_input.value;
  localStorage.setItem(
    "dictionarySettings",
    JSON.stringify(dictionarySettings)
  );
  r.style.setProperty("--maincolor", color_main);
}

function settings_backgroundcolor() {
  color_background = background_color_input.value;
  dictionarySettings["Backgroundcolor"] = background_color_input.value;
  localStorage.setItem(
    "dictionarySettings",
    JSON.stringify(dictionarySettings)
  );
  r.style.setProperty("--backgroundcolor", color_background);
}

function clock() {
  var dateTime = new Date();
  var date = dateTime.getDate();
  var month = dateTime.getMonth();
  var year = dateTime.getFullYear();
  var hrs = dateTime.getHours();
  var min = dateTime.getMinutes();
  var sec = dateTime.getSeconds();
  var enabled = dictionarySettings["clocksettings"];
  let time = null;
  hrs >= 10 || (hrs = "0" + hrs);
  min >= 10 || (min = "0" + min);
  sec >= 10 || (sec = "0" + sec);
  month >= 10 || (month = "0" + month);
  date >= 10 || (date = "0" + date);
  var settime = [
    date + "." + month,
    "." + year + "  ",
    hrs + ":" + min,
    ":" + sec,
  ];
  for (let i = 0; i < 4; i++) {
    if (dictionarySettings["clocksettings"][i] == 1) {
      time == null ? (time = settime[i]) : (time += settime[i]);
      if (
        i == 0 &&
        dictionarySettings["clocksettings"][i + 2] == 1 &&
        dictionarySettings["clocksettings"][i + 1] == 0
      )
        time += "  ";
    }
    if (loadclock == "true")
      document.querySelector("#clockid").innerHTML = time;
  }
}

function checkclocksettingsexist() {
  dictionarySettings["clocksettings"] != null ||
    (dictionarySettings["clocksettings"] = [0, 0, 1, 1]);
  localStorage.setItem(
    "dictionarySettings",
    JSON.stringify(dictionarySettings)
  );
}

function buttonscolor() {
  for (let i = 0; i < 4; i++) {
    if (dictionarySettings["clocksettings"][i] == 1) {
      document.querySelector(clockids[i]).style.backgroundColor =
        "var(--maincolor)";
      document.querySelector(clockids[i]).style.color =
        "var(--backgroundcolor)";
    } else {
      document.querySelector(clockids[i]).style.backgroundColor =
        "var(--backgroundcolor)";
      document.querySelector(clockids[i]).style.color = "var(--maincolor)";
    }
  }
}

function buttonclocksettingsclicked(id) {
  id % 2 == 0
    ? dictionarySettings["clocksettings"][id] == 0 ||
      (dictionarySettings["clocksettings"][id + 1] = 0)
    : dictionarySettings["clocksettings"][id] == 1 ||
      (dictionarySettings["clocksettings"][id - 1] = 1);
  dictionarySettings["clocksettings"][id] == 0
    ? (dictionarySettings["clocksettings"][id] = 1)
    : (dictionarySettings["clocksettings"][id] = 0);
  buttonscolor();
  localStorage.setItem(
    "dictionarySettings",
    JSON.stringify(dictionarySettings)
  );
}

function gotosettings() {
  body.innerHTML = `<div class="positionsettings"><svg xmlns="http://www.w3.org/2000/svg" onclick="onstart();" width="48" height="48"viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><pathd="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93227.28622 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072216.714 212Z" /><path stroke-linecap="round" d="m14.5 9.5l-5 5m0-5l5 5" /></g></svg></div><div class="settings"><div class="titlesettings">Settings</div><div class="forms"><input type="color" onchange="settings_maincolor()" id="main_color_input"><input type="color" onchange="settings_backgroundcolor()" id="background_color_input"></div><div class="buttons"><button id="day" onclick="buttonclocksettingsclicked(0);">day.month</button><button id="year" onclick="buttonclocksettingsclicked(1);">.year</button><button id="hour" onclick="buttonclocksettingsclicked(2);">hour:minute</button><button id="second" onclick="buttonclocksettingsclicked(3);">:second</button></div><div class="addons"><div class="add_addons"><div class="add_text">+</div></div></div></div>`;
  document.getElementById("main_color_input").value = color_main;
  document.getElementById("background_color_input").value = color_background;
  buttonscolor();
  loadclock = "false";
  r.style.setProperty("--maincolor", color_main);
}

setInterval(clock, 1000);
