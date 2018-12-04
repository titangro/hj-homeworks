'use strict';

let lastwsCard;

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('open', event => {
	console.log('Вебсокет');
});

ws.addEventListener('error', error => {
	console.log(error);
});

ws.addEventListener('message', (num) => {
	flipIt(num, 'websocket div')});

function flipIt(num, node) {
  const numbers = document.querySelectorAll(`.${node}`)
  Array.from(numbers).forEach(item => {
  	item.classList.remove('flip-it');
    if(item.textContent == num.data) {
      item.classList.add('flip-it');
    }
  })
}