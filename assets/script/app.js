'use strict';

const mainTime = document.querySelector('.time');
const setAlarmTime = document.querySelector('.set-alarm-time');
const hoursInput = document.querySelector('.hours');
const minutesInput = document.querySelector('.minutes');

function updateCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    mainTime.textContent = `${hours}:${minutes}`;
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

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