'use strict';

const mainTime = document.querySelector('.time');
const setAlarmTime = document.querySelector('.set-alarm-time');
const hoursInput = document.querySelector('.hours');
const minutesInput = document.querySelector('.minutes');
const setAlarm = document.querySelector('.set');
const alarm = new Audio('./assets/audio/ring.mp3');
alarm.type = 'audio/mp3';

//Set the main time on page load
function setInitialTime() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    if(hours < 10) {
        hours = `0${hours}`;
    }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    mainTime.innerText = `${hours}:${minutes}`;
}
window.addEventListener('load', setInitialTime);

//Update the current time and call compareTimes
let currentSetTime = 0;
function updateCurrentTime() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    if(hours < 10) {
        hours = `0${hours}`;
    }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(`${hours}:${minutes}` != currentSetTime) {
        mainTime.innerText = `${hours}:${minutes}`;
        currentSetTime = `${hours}:${minutes}`;
        compareTimes();
    }
}

//Force the inputs to accept 2 numbers maximum/Numbers only
function validateInput(input) {
    let value = input.value;
    input.value = value.replace(/\D/g, '').slice(0, 2);
}
hoursInput.addEventListener('input', () => {
    validateInput(hoursInput);
});
minutesInput.addEventListener('input', () => {
    validateInput(minutesInput);
});

//Validate the input to make sure it is within hours/minutes range
let validHours = false;
let validMinutes = false;
function checkValidTime() {
    let hours = hoursInput.value;
    let minutes = minutesInput.value;
    if(hours != '' && hours.toString().length == 2) {
        if(hours <= 23) {
            validHours = true;
            hoursInput.style.borderColor = 'rgb(57, 149, 84)';
        }
        else if(hours < 25 && minutes === '00') {
            validHours = true;
            hoursInput.style.borderColor = 'rgb(57, 149, 84)';
        }
        else {
            validHours = false;
            hoursInput.style.borderColor = 'rgb(255, 0, 0)';
        }
    }
    else {
        validHours = false;
        hoursInput.style.borderColor = 'rgb(255, 0, 0)';
    }
    if(minutes != '' && minutes <=59 && minutes.toString().length == 2) {
        validMinutes = true;
        minutesInput.style.borderColor = 'rgb(57, 149, 84)';
    }
    else {
        validMinutes = false;
        minutesInput.style.borderColor = 'rgb(255, 0, 0)';
    }
}

//Clear the output when valid time is submited
function clearInput() {
    if(validHours && validMinutes) {
        setAlarmTime.innerText = `${hoursInput.value}:${minutesInput.value}`
        hoursInput.value = '';
        minutesInput.value = '';
        hoursInput.style.borderColor = 'rgb(58, 58, 59)';
        minutesInput.style.borderColor = 'rgb(58, 58, 59)';
        validHours = false;
        validMinutes = false;
    }
}
setAlarm.addEventListener('click', () => {
    checkValidTime();
    setInterval(clearInput, 400);
});

//Check if its alarm time
function compareTimes() {
    if(mainTime.innerText === setAlarmTime.innerText) {
        mainTime.classList.add('green');
        alarm.play();
        setTimeout(() => {
            mainTime.classList.remove('green');
            setAlarmTime.innerText = '--:--';
            validHours = false;
            validMinutes = false;
        }, 8000);
    }
}

//Check if the clock is updated every second
setInterval(() => {
    updateCurrentTime();
}, 1000);