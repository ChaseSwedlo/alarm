'use strict';

const mainTime = document.querySelector('.time');
const setAlarmTime = document.querySelector('.set-alarm-time');
const hoursInput = document.querySelector('.hours');
const minutesInput = document.querySelector('.minutes');
const setAlarm = document.querySelector('.set');

function updateCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    mainTime.textContent = `${hours}:${minutes}`;
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

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
    if(hours != '' && hours <=24) {
        validHours = true;
        hoursInput.style.borderColor = 'rgb(0, 255, 0)';
    }
    else {
        hoursInput.style.borderColor = 'rgb(255, 0, 0)';
    }
    if(minutes != '' && minutes <=59) {
        validMinutes = true;
        minutesInput.style.borderColor = 'rgb(0, 255, 0)';
    }
    else {
        minutesInput.style.borderColor = 'rgb(255, 0, 0)';
    }
}
//Clear the output when valid time is submited
function clearInput() {
    if(validHours && validMinutes) {
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
    clearInput();
});