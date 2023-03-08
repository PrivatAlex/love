const button = document.querySelector('.btn');
const done = document.querySelector('.btn-done');

const chatId = '-986617584';

const token = '5988246646:AAEflFYLn0lXT0PM26KhenL3hNt7OBqUJbM';

let inWorking = localStorage.getItem('inWorking');

if (inWorking === 'true') {
  button.classList.toggle('wait');
  done.style.display = 'block'
  button.disabled = true;
}

let latitude;
let longitude;
navigator.geolocation.getCurrentPosition(function(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
})

function sendMessage() {
  button.classList.toggle('wait');
  done.style.display = 'block'
  button.disabled = true;
  inWorking = 'true'
  localStorage.setItem('inWorking', inWorking);

  const message = `!!!!Срочно!!!! Вызов Кунимистера!!!! 
      Вас ждут по этим координатам: 
      https://www.google.com/maps?q=${latitude},${longitude}`;

  const url = `https://api.telegram.org/bot${ token }/sendMessage?chat_id=${ chatId }&text=${ encodeURIComponent(
    message) }`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        alert('Сообщение с координатами отправлено!');
      } else {
        alert('Произошла ошибка при отправке сообщения.');
      }
    })
    .catch(error => {
      alert(`Произошла ошибка: ${ error.message }`);
    });

}

button.addEventListener('click', sendMessage);

done.addEventListener('click', () => {
  done.style.display = 'none'
  button.classList.toggle('wait');
  button.disabled = false;
  inWorking = 'false'
  localStorage.setItem('inWorking', inWorking);
})
