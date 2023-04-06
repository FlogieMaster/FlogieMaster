let color_main = 'rgb(255, 255, 255)'
let color_background = 'rgb(0, 0, 0)'
var timedublepointsmall = ':';
var timedublepointbig = ' : ';
let dictionarySettings = JSON.parse(localStorage.getItem('dictionarySettings')) || { "Color": "white", "Backgroundcolor": "black", "clock": "off", "clocksettings": [0, 0, 0, 1, 1, 1] };
var r = document.querySelector(':root');
let clockids = ["#day", "#month", "#year", "#hour", "#minute", "#second"]
let loadclock = "true"

function google() {
    if (searchinput.value == 'settings') {
        body.innerHTML = '<div class="position"><svg xmlns="http://www.w3.org/2000/svg" onclick="onstart();" width="48" height="48"viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><pathd="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" /><path stroke-linecap="round" d="m14.5 9.5l-5 5m0-5l5 5" /></g></svg></div><div class="settings"><span class="setting-title">Settings</span><form onchange="settings_maincolor()" class="color_I"><input type="color" id="main_color_input"></form><form onchange="settings_backgroundcolor()" class="color_I"><input type="color" id="background_color_input"></form><div class="clock_settings"><div class="clockinputs"><button id="on" onclick="clockonoffbutton();">on</button><button id="day" onclick="buttonclocksettingsclicked(0);">day</button><button id="month" onclick="buttonclocksettingsclicked(1);">month</button><button id="year" onclick="buttonclocksettingsclicked(2);">year</button><button id="hour" onclick="buttonclocksettingsclicked(3);">hour</button><button id="minute" onclick="buttonclocksettingsclicked(4);">minute</button><button id="second" onclick="buttonclocksettingsclicked(5);">second</button></div></div></div>';
        document.getElementById('main_color_input').value = color_main;
        document.getElementById('background_color_input').value = color_background;
        buttonscolor();
        loadclock = "false";
        r.style.setProperty('--maincolor', color_main);
    } else if (searchinput.value == 'color') {
        console.log('color')
    } else {
        console.log(searchinput.value);
        if (searchinput.value.includes('.')) {
            (searchinput.value.includes('www') && searchinput.value.includes('https') == false) || open("https://" + searchinput.value);
            (searchinput.value.includes('https')) ? open(searchinput.value) : open("https://www." + searchinput.value);
        } else {
            open("https://google.com/search?q=" + searchinput.value);
        }
        searchinput.value = '';
        searchinput.select();
    }
}

function onstart() {
    loadclock = "true";
    color_main = dictionarySettings["Color"];
    color_background = dictionarySettings["Backgroundcolor"];
    if (dictionarySettings["clock"] == "on") {
        body.innerHTML = '<div class="clock" id="clock"><span id="clockid">00:00:00</span></div><form onsubmit="google();" id="maincontent"><h1><input class="search" type="text" id="searchinput" autocomplete="off"></h1></form>'
        checkclocksettingsexist()
    } else {
        body.innerHTML = '<form onsubmit="google();" id="maincontent"></form>'
    }
    maincontent.innerHTML = '<h1><input class="search" type="text" id="searchinput" autocomplete="off"></h1>';
    r.style.setProperty('--maincolor', color_main);
    r.style.setProperty('--backgroundcolor', color_background);
    clock();
    searchinput.select();
}

function settings_maincolor() {
    color_main = main_color_input.value;
    dictionarySettings["Color"] = main_color_input.value;
    localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
    r.style.setProperty('--maincolor', color_main);
}

function settings_backgroundcolor() {
    color_background = background_color_input.value;
    dictionarySettings["Backgroundcolor"] = background_color_input.value;
    localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
    r.style.setProperty('--backgroundcolor', color_background);
}

function clock() {
    if (dictionarySettings["clock"] == "on") {
        var dateTime = new Date();
        var date = dateTime.getDate();
        var month = dateTime.getMonth();
        var year = dateTime.getFullYear();
        var hrs = dateTime.getHours();
        var min = dateTime.getMinutes();
        var sec = dateTime.getSeconds();
        var enabled = dictionarySettings["clocksettings"];
        let time = null;
        (hrs > 10) || (hrs = "0" + hrs);
        (min > 10) || (min = "0" + min);
        (sec > 10) || (sec = "0" + sec);
        (month > 10) || (month = "0" + month);
        var settime = [date, month, year, hrs, min, sec];
        for (let i = 0; i < 6; i++) {
            if (dictionarySettings["clocksettings"][i] == 1) {
                (time == null) ? time = settime[i] : time += settime[i];
                if (i == 2) time += "  ";
                if (dictionarySettings["clocksettings"][i + 1] == 1 || dictionarySettings["clocksettings"][i + 2] == 1) {
                    (i > 1) || (time += ".");
                    (i < 3) || (time += ":");
                }
            }
        }
        if (loadclock == "true") document.querySelector('#clockid').innerHTML = time;
    }
}

function checkclocksettingsexist() {
    (dictionarySettings["clocksettings"] != null) || (dictionarySettings["clocksettings"] = [0, 0, 0, 1, 1, 1]);
    localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings));
}

function buttonscolor() {
    if (dictionarySettings["clock"] == "off") {
        document.querySelector('#on').style.backgroundColor = "#202020";
        document.querySelector('#on').style.color = "#ccc";
    } if (dictionarySettings["clock"] == "on") {
        document.querySelector('#on').style.backgroundColor = "#ccc";
        document.querySelector('#on').style.color = "#202020";
    }

    for (let i = 0; i < 6; i++) {
        if (dictionarySettings["clocksettings"][i] == 1) {
            document.querySelector(clockids[i]).style.backgroundColor = "#ccc";
            document.querySelector(clockids[i]).style.color = "#202020";
        } else {
            document.querySelector(clockids[i]).style.backgroundColor = "#202020";
            document.querySelector(clockids[i]).style.color = "#ccc";
        }
    }
}

function buttonclocksettingsclicked(id) {
    (dictionarySettings["clocksettings"][id] == 0) ? dictionarySettings["clocksettings"][id] = 1 : dictionarySettings["clocksettings"][id] = 0;
    buttonscolor();
    localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
}

function clockonoffbutton() {
    (dictionarySettings["clock"] == "on") ? dictionarySettings["clock"] = "off" : dictionarySettings["clock"] = "on"; 
    buttonscolor();
    localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
}

setInterval(clock, 1000)