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
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    if(minutes >= 10) {
        mainTime.innerText = `${hours}:${minutes}`;
    }
    else {
        mainTime.innerText = `${hours}:0${minutes}`;
    }
}
window.addEventListener('load', setInitialTime);

//Update the current time and call compareTimes
function updateCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    let currentSetTime = 0;
    if(`${hours}:${minutes}` != currentSetTime) {
        compareTimes();
        if(minutes >= 10) {
            mainTime.innerText = `${hours}:${minutes}`;
            currentSetTime = `${hours}:${minutes}`;
        }
        else {
            mainTime.innerText = `${hours}:0${minutes}`;
            currentSetTime = `${hours}:0${minutes}`;
        }
    }
}

//Make the inputs accept 2 numbers maximum only
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

//Validate the input to make sure it is within hours/minutes
let validHours = false;
let validMinutes = false;
function checkValidTime() {
    let hours = hoursInput.value;
    let minutes = minutesInput.value;
    if(hours != '' && hours <=23) {
        validHours = true;
        hoursInput.style.borderColor = 'rgb(0, 255, 0)';
    }
    else {
        validHours = false;
        hoursInput.style.borderColor = 'rgb(255, 0, 0)';
    }
    if(minutes != '' && minutes <=59) {
        validMinutes = true;
        minutesInput.style.borderColor = 'rgb(0, 255, 0)';
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
    setInterval(clearInput, 500);
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