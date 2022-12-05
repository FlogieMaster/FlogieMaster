let color_main = 'rgb(255, 255, 255)'
let color_background = 'rgb(0, 0, 0)'

function google() {
    if (searchinput.value != 'settings') {
        console.log(searchinput.value);
        open("https://google.com/search?q=" + searchinput.value)
        searchinput.value = '';
        searchinput.select();
    } else {
        body.innerHTML = '<div class="settings"><span class="setting-title">Settings</span><form onsubmit="settings_maincolor();  return false;" id="settings"><input class="maincolor" type="text" id="maincolorinput"autocomplete="off" placeholder="Main-Color white"></form><form onsubmit="settings_backgroundcolor(); return false;" id="settings"><input class="bkcolor" type="text" id="backgroundcolorinput" autocomplete="off"placeholder="Background-Color black"></form></div>'
        document.querySelector('body').style.color = color_main;
        document.querySelector('input').style.color = color_main;
        document.querySelector('span').style.color = color_main;
    }
}

function onstart() {
    body.innerHTML = '<form onsubmit="google();" id="maincontent"></form>'
    maincontent.innerHTML = '<h1><input class="search" type="text" id="searchinput" autocomplete="off"></h1>';
    searchinput.select();
    document.querySelector('body').style.color = color_main;
    document.querySelector('input').style.color = color_main;
    document.querySelector('span').style.color = color_main;
    document.getElementById('searchinput').style.backgroundColor = color_background;
}

function settings_maincolor() {
    if (maincolorinput.value == 'esc') {
        onstart();
    }
    color_main = maincolorinput.value;
    document.querySelector('body').style.color = color_main;
    document.querySelector('input').style.color = color_main;
    document.querySelector('span').style.color = color_main;
    maincolorinput.value = '';
}

function settings_backgroundcolor() {
    if (backgroundcolorinput.value == 'esc') {
        onstart();
    }
    color_background = backgroundcolorinput.value;
    document.querySelector('body').style.backgroundColor = color_background;
    document.querySelector('input').style.backgroundColor = color_background;
    document.querySelector('span').style.backgroundColor = color_background;
    document.getElementById('searchinput').style.backgroundColor = color_background;
    backgroundcolorinput.value = '';
}
