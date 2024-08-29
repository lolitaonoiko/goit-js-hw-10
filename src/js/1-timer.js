import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    validationDate();
  },
};

const dateTimeArea = flatpickr('#datetime-picker', options);

const inputArea = document.querySelector('#datetime-picker');
const timerBox = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

let userSelectedDate;

inputArea.addEventListener('blur', () => {
  options.onClose();
});

const validationDate = () => {
  userSelectedDate = new Date(inputArea.value);
  const changedDate = userSelectedDate.getTime();

  if (changedDate < Date.now()) {
    alert('Please choose a date in the future');
    btnStart.disabled = true;
  } else {
    btnStart.disabled = false;
  }
};

const startTimer = () => {
  userSelectedDate = new Date(inputArea.value).getTime();

  setInterval(() => {
    const nowTime = Date.now();

    const intervalMSecs = userSelectedDate - nowTime;
    convertMs(intervalMSecs);
  }, 1000);
};
btnStart.addEventListener('click', startTimer);

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  dataDays.innerHTML = days;
  dataHours.innerHTML = hours;
  dataMinutes.innerHTML = minutes;
  dataSeconds.innerHTML = seconds;

  return { days, hours, minutes, seconds };
};
// class Timer {
//   creationTimer() {
//     const startTime = Date.now();

//     setInterval(() => {
//       const currentTime = Date.now();
//     }, 1000);
//   }
// }

// class Timer {
//   constructor(fff) {
//     this.isActive = false;
//     this.fff = fff;
//   }
//   creationTimer() {
//     if (this.isActive) {
//       return;
//     }
//     const startTime = Date.now();
//     this.isActive = true;

//     setInterval(() => {
//       const currentTime = Date.now();
//       const resultTime = currentTime - startTime;
//       const editedTime = this.getTime(resultTime);
//       console.log(editedTime);
//     }, 1000);
//   }
//   getTime(value) {
//     const hrs = Math.floor((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const secs = Math.floor((value % (1000 * 60)) / 1000);
//     const mins = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
//     console.log(mins);
//     return { hrs, mins, secs };
//   }
// }

// const timer = new Timer({ fff: runClock });
// btnStart.addEventListener('click', timer.creationTimer.bind(timer));

// function runClock({ hrs, mins, secs }) {}
