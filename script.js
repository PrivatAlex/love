const button = document.querySelector('.btn');
const done = document.querySelector('.btn-done');
const modal = document.querySelector('.modal');

const chatId = '-986617584';

const token = '5988246646:AAEflFYLn0lXT0PM26KhenL3hNt7OBqUJbM';

let inWorking = localStorage.getItem('inWorking');

if (inWorking === 'true') {
  button.classList.toggle('wait');
  done.style.display = 'block'
  button.disabled = true;
}


let message;
navigator.geolocation.getCurrentPosition(function (position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  message = `!!!!Срочно!!!! Вызов Кунимистера!!!! 
      Вас ждут по этим координатам: 
      https://www.google.com/maps?q=${ latitude },${ longitude }`;

  if (latitude !== undefined && longitude !== undefined) {
    button.addEventListener('click', sendMessage);
  }
  return message;
})

function sendMessage() {
  button.classList.toggle('wait');
  done.style.display = 'block'
  button.disabled = true;
  inWorking = 'true'
  localStorage.setItem('inWorking', inWorking);

  const url = `https://api.telegram.org/bot${ token }/sendMessage?chat_id=${ chatId }&text=${ encodeURIComponent(
    message) }`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log('Сообщение с координатами отправлено!');
      } else {
        alert('Произошла ошибка при отправке сообщения.');
      }
    })
    .catch(error => {
      alert(`Произошла ошибка: ${ error.message }`);
    });
}

done.addEventListener('click', () => {
  done.style.display = 'none'
  button.classList.toggle('wait');
  button.disabled = false;
  inWorking = 'false'
  localStorage.setItem('inWorking', inWorking);
  modal.style.display = 'flex'
})

const btnRate = document.querySelector('.rate');
const radioButtons = document.getElementsByName('rating');
let rate;
let evolution;
let messageRate;

function getAverage(rate) {
  let sum = 0;
  for (let i = 0; i < rate.length; i++) {
    sum += Number(rate[i]);
  }
  return sum / rate.length;
}

const ratesColor = document.querySelectorAll('input[type="radio"]');

// Добавляем обработчик события на каждую radio-кнопку
ratesColor.forEach((rateButton, index) => {
  rateButton.addEventListener('click', () => {
    // Перекрашиваем все звезды до выбранной в зеленый цвет
    for (let i = 0; i <= index; i++) {
      const star = document.querySelectorAll('.star')[i];
      star.style.color = 'orange';
    }

    // Перекрашиваем все звезды после выбранной в серый цвет
    for (let i = index + 1; i < ratesColor.length; i++) {
      const star = document.querySelectorAll('.star')[i];
      star.style.color = 'black';
    }
  });
});

function sendMessageRate() {
  rate = JSON.parse(localStorage.getItem('rate'));
  if (rate === null){
    rate = []
  }

  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      evolution = radioButtons[i].value;
      rate.push(`${radioButtons[i].value}`);
    }
  }

  if (evolution === undefined) {
    evolution = 1;
    rate.push(evolution);
  }

  localStorage.setItem('rate', JSON.stringify(rate));

  messageRate = `Предоставленную Вами услугу оценили на ${evolution} баллов!
                 Ваш средний рейтинг ${getAverage(rate)}`;

  const url = `https://api.telegram.org/bot${ token }/sendMessage?chat_id=${ chatId }&text=${ encodeURIComponent(
    messageRate) }`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        alert('Сообщение с оценкой отправлено!');
      } else {
        alert('Произошла ошибка при отправке сообщения.');
      }
    })
    .catch(error => {
      alert(`Произошла ошибка: ${ error.message }`);
    });
}

btnRate.addEventListener('click', (event) => {
  event.preventDefault();
  sendMessageRate();
  modal.style.display = 'none';
})
