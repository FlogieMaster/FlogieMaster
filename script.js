let color_main = 'rgb(255, 255, 255)'
let color_background = 'rgb(0, 0, 0)'
var timedublepointsmall = ':';
var timedublepointbig = ' : ';
let dictionarySettings = JSON.parse(localStorage.getItem('dictionarySettings')) || { "Color": "white", "Backgroundcolor": "black", "clock": "off" };

function google() {
    if (searchinput.value == 'settings') {
        body.innerHTML = '<div class="position"><div class="x" onclick="onstart();"><div class="x_text">X</div></div></div><div class="settings"><span class="setting-title">Settings</span><form onchange="settings_maincolor()" class="color_I"><input type="color" id="main_color_input"></form><form onchange="settings_backgroundcolor()" class="color_I"><input type="color" id="background_color_input"></form></div>'
        document.getElementById('main_color_input').value = color_main;
        document.getElementById('main_color_input').style.border = "6px solid";
        document.getElementById('main_color_input').style.borderRadius = "6px";
        document.getElementById('background_color_input').value = color_background;
        document.getElementById('background_color_input').style.border = "6px solid";
        document.getElementById('background_color_input').style.borderColor = color_background;
        document.querySelector('body').style.color = color_main; 
        document.querySelector('input').style.color = color_main;
        document.querySelector('span').style.color = color_main;
        document.getElementById('backgroundcolorinput').style.backgroundColor = color_background;
    document.getElementById('maincolorinput').style.backgroundColor = color_background;
    } else if (searchinput.value == 'clock on') {
        dictionarySettings["clock"] = "on";
        localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings));
        onstart();
    } else if (searchinput.value == 'clock off') {
        dictionarySettings["clock"] = "off";
        localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
        onstart();
    }else if(searchinput.value == 'color'){
        console.log('color')
    } else {
        console.log(searchinput.value);
        if(searchinput.value.includes('.')){
            if(searchinput.value.startsWith('https://www.')){
                open(searchinput.value);
            }else{
                open("https://www." + searchinput.value);
                
            }
        }else{
            open("https://google.com/search?q=" + searchinput.value);
        }
        searchinput.value = '';
        searchinput.select();
    } 
}

function onstart() {
    color_main = dictionarySettings["Color"];
    color_background = dictionarySettings["Backgroundcolor"];
    if (dictionarySettings["clock"] == "on") {
        body.innerHTML = '<div class="clock" id="clock"><span id="clockid">00:00:00</span></div><form onsubmit="google();" id="maincontent"><h1><input class="search" type="text" id="searchinput" autocomplete="off"></h1></form>'
        document.getElementById('clockid').style.color = color_main;
    } else {
        body.innerHTML = '<form onsubmit="google();" id="maincontent"></form>'
    }
    maincontent.innerHTML = '<h1><input class="search" type="text" id="searchinput" autocomplete="off"></h1>';
    document.querySelector('body').style.color = color_main;
    document.querySelector('input').style.color = color_main;
    document.querySelector('input').style.backgroundColor = color_background;
    document.querySelector('body').style.backgroundColor = color_background;
    clock();
    searchinput.select();
}

function settings_maincolor() {
    color_main = main_color_input.value;
    dictionarySettings["Color"] = main_color_input.value;
    localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
    document.querySelector('body').style.color = color_main;
    document.querySelector('input').style.color = color_main;
    document.querySelector('span').style.color = color_main;
    document.getElementById('main_color_input').style.borderColor = color_main;
}

function settings_backgroundcolor() {
    color_background = background_color_input.value;
    dictionarySettings["Backgroundcolor"] = background_color_input.value;
    localStorage.setItem('dictionarySettings', JSON.stringify(dictionarySettings))
    document.querySelector('body').style.backgroundColor = color_background;
    document.querySelector('input').style.backgroundColor = color_background;
    document.getElementById('backgroundcolorinput').style.backgroundColor = color_background;
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
    if (dictionarySettings["clock"] == "on"){
        document.getElementById('clockid').innerHTML = time;
    }
    
}

setInterval(clock, 1000)
