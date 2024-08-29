import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
// import 'flatpickr/dist/themes/light.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    timer.validationDate();
  },
};

const dateTimeArea = flatpickr('#datetime-picker', options);

const inputArea = document.querySelector('#datetime-picker');
const disabledInput = document.querySelector('.flatpickr-mobile');

const btnStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
disabledInput.classList.add('js-style');
inputArea.classList.add('js-style');
let userSelectedDate;
let intervalId;

class Timer {
  constructor() {
    this.options = options;
  }

  validationDate() {
    userSelectedDate = new Date(inputArea.value);
    const changedDate = userSelectedDate.getTime();

    if (changedDate < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  }
  startTimer() {
    btnStart.disabled = true;
    userSelectedDate = new Date(inputArea.value).getTime();

    intervalId = setInterval(() => {
      const nowTime = Date.now();
      const intervalMSecs = userSelectedDate - nowTime;

      if (intervalMSecs <= 0) {
        clearInterval(intervalId);
        this.convertMs(0);

        iziToast.success({
          title: 'The timer has ended.',
          message: 'Please select the next date!',
        });
        btnStart.disabled = true;

        return;
      } else {
        btnStart.disabled = true;
        inputArea.disabled - true;
      }

      this.convertMs(intervalMSecs);
    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    dataDays.innerHTML = days;
    dataHours.innerHTML = hours;
    dataMinutes.innerHTML = minutes;
    dataSeconds.innerHTML = seconds;

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer();
inputArea.addEventListener('blur', () => {
  timer.validationDate();
});
btnStart.addEventListener('click', timer.startTimer.bind(timer));
