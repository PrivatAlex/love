// Получаем элемент кнопки на странице
const button = document.querySelector('.btn');
const done = document.querySelector('.btn-done');

// Задаем ID чата, куда нужно отправлять сообщение
const chatId = '-986617584';

// Задаем токен бота
const token = '5988246646:AAEflFYLn0lXT0PM26KhenL3hNt7OBqUJbM';

let inWorking = localStorage.getItem('inWorking');

if (inWorking === 'true') {
  button.classList.toggle('wait');
  done.style.display = 'block'
  button.disabled = true;
}

function sendMessage() {
  button.classList.toggle('wait');
  done.style.display = 'block'
  button.disabled = true;
  inWorking = 'true'
  localStorage.setItem('inWorking', inWorking);


  const message = '!!!!Срочно!!!! Вызов Кунимистера!!!!';
  const url = `https://api.telegram.org/bot${ token }/sendMessage?chat_id=${ chatId }&text=${ encodeURIComponent(
    message) }`;

  fetch(url)
    .then(response => {
      // Если ответ сервера успешный, выводим сообщение об успехе
      if (response.ok) {
        console.log('Сообщение отправлено!');
      } else {
        alert('Произошла ошибка при отправке сообщения.');
      }
    })
    .catch(error => {
      alert(`Произошла ошибка: ${ error.message }`);
    });

}

// Обработчик нажатия на кнопку
button.addEventListener('click', sendMessage);

done.addEventListener('click', () => {
  done.style.display = 'none'
  button.classList.toggle('wait');
  button.disabled = false;
  inWorking = 'false'
  localStorage.setItem('inWorking', inWorking);
})
