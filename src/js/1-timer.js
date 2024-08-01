import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
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

  return { days, hours, minutes, seconds };
}

const elementInput = document.querySelector('#datetime-picker');
const butStart = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

butStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        message: 'Please choose a date in the future',
      });
      butStart.disabled = true;
    } else {
      butStart.disabled = false;
      butStart.addEventListener('click', () => {
        startTimer(selectedDates[0]);
      });
    }
  },
};

flatpickr(elementInput, options);

function startTimer(selectedDate) {
  const endDate = new Date(selectedDate).getTime();
  let timerInterval;

  function updateTimer() {
    const now = new Date().getTime();
    const remainingTime = endDate - now;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      console.log('Таймер завершено');
      butStart.disabled = false;
      elementInput.disabled = false;
      iziToast.show({
        position: 'topRight',
        backgroundColor: 'green',
        messageColor: 'white',
        message: 'Таймер завершено',
      });
      return;
    }
    const time = convertMs(remainingTime);
    daysElem.textContent = String(time.days).padStart(2, '0');
    hoursElem.textContent = String(time.hours).padStart(2, '0');
    minutesElem.textContent = String(time.minutes).padStart(2, '0');
    secondsElem.textContent = String(time.seconds).padStart(2, '0');
  }
  timerInterval = setInterval(updateTimer, 1000);
  butStart.disabled = true;
  elementInput.disabled = true;
}
