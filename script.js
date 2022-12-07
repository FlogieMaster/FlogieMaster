let color_main = 'rgb(255, 255, 255)'
let color_background = 'rgb(0, 0, 0)'
var timedublepointsmall = ':';
var timedublepointbig = ' : ';
let dictionarySettings = JSON.parse(localStorage.getItem('dictionarySettings')) || { "Color": "white", "Backgroundcolor": "black", "clock": "off" };

function google() {
    if (searchinput.value == 'settings') {
        body.innerHTML = '<div class="settings"><span class="setting-title">Settings</span><form onsubmit="settings_maincolor();  return false;" id="settings"><input class="maincolor" type="text" id="maincolorinput"autocomplete="off" placeholder="Main-Color white"></form><form onsubmit="settings_backgroundcolor(); return false;" id="settings"><input class="bkcolor" type="text" id="backgroundcolorinput" autocomplete="off"placeholder="Background-Color black"></form></div>'
        document.querySelector('body').style.color = color_main;
        document.querySelector('input').style.color = color_main;
        document.querySelector('span').style.color = color_main;
        document.getElementById('backgroundcolorinput').style.backgroundColor = color_background;
    document.getElementById('maincolorinput').style.backgroundColor = color_background;
    } else if (searchinput.value == 'clock on') {
        dictionarySettings["clock"] = "on";
        localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
        onstart();
    } else if (searchinput.value == 'clock off') {
        dictionarySettings["clock"] = "off";
        localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
        onstart();
    } else {
        console.log(searchinput.value);
        open("https://google.com/search?q=" + searchinput.value)
        searchinput.value = '';
        searchinput.select();
    }
}

function onstart() {
    color_main = dictionarySettings["Color"];
    color_background = dictionarySettings["Backgroundcolor"];
    if (dictionarySettings["clock"] == "on") {
        body.innerHTML = '<div class="clock" id="clock"><span id="clockid">00:00:00</span></div><form onsubmit="google();" id="maincontent"><h1><input class="search" type="text" id="searchinput" autocomplete="off"></h1></form>'
    } else {
        body.innerHTML = '<form onsubmit="google();" id="maincontent"></form>'
    }
    maincontent.innerHTML = '<h1><input class="search" type="text" id="searchinput" autocomplete="off"></h1>';
    searchinput.select();
    document.querySelector('body').style.color = color_main;
    document.querySelector('input').style.color = color_main;
    document.querySelector('input').style.backgroundColor = color_background;
    document.querySelector('body').style.backgroundColor = color_background;
    document.getElementById('clockid').style.color = color_main;
    clock();
}

function settings_maincolor() {
    if (maincolorinput.value == 'esc') {
        onstart();
    }
    color_main = maincolorinput.value;
    dictionarySettings["Color"] = maincolorinput.value;
    localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
    document.querySelector('body').style.color = color_main;
    document.querySelector('input').style.color = color_main;
    document.querySelector('span').style.color = color_main;
    maincolorinput.value = '';
    console.log('a');
}

function settings_backgroundcolor() {
    if (backgroundcolorinput.value == 'esc') {
        onstart();
    }
    color_background = backgroundcolorinput.value;
    dictionarySettings["Backgroundcolor"] = backgroundcolorinput.value;
    localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
    document.querySelector('body').style.backgroundColor = color_background;
    document.querySelector('input').style.backgroundColor = color_background;
    document.getElementById('backgroundcolorinput').style.backgroundColor = color_background;
    backgroundcolorinput.value = '';
}

function clock() {
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    if (hrs < 10) {
        hrs = "0" + hrs;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    let time = hrs + ':' + min + ':' + sec;
    document.getElementById('clockid').innerHTML = time;
}

setInterval(clock, 1000)