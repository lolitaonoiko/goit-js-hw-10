// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[type="number"]');
const radioFulfilled = document.querySelector('input[value="fulfilled"]');
const radioRejected = document.querySelector('input[value="rejected"]');
const btn = document.querySelector('button[type="submit"]');

const executor = (resolve, reject) => {
  const delay = inputDelay.value;
  setTimeout(() => {
    if (radioFulfilled.checked) {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
      resolve(`✅ Fulfilled promise in ${delay}ms`);
    } else if (radioRejected.checked) {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
      });
      reject(`❌ Rejected promise in ${delay}ms`);
    }
  }, delay);
};

function createPromise(event) {
  event.preventDefault();
  const newPromis = new Promise(executor);

  newPromis
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}
form.addEventListener('submit', createPromise);
