import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const makePromise = (stateValue, delayValue) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        iziToast.show({
          backgroundColor: 'rgb(46, 243, 7)',
          messageColor: 'white',
          message: `✅ Fulfilled promise in ${delayValue} ms`,
        });
        resolve();
      } else {
        iziToast.show({
          backgroundColor: 'rgb(240, 116, 133)',
          messageColor: 'white',
          message: `❌ Rejected promise in ${delayValue} ms`,
        });
        reject();
      }
    }, delayValue);
  });
};

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const form = event.target;
  const delayValue = form.querySelector('input[name="delay"]').value;
  const stateValue = form.querySelector('input[name="state"]:checked').value;

  makePromise(stateValue, delayValue);
});
