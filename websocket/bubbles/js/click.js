'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', () => {	
	showBubbles(connection);
});

connection.addEventListener('message', event => {
	//console.log(`Сообщение: ${event.data}`);
});

connection.addEventListener('close', event => {
	console.log('Соединение закрыто', event);
});

connection.addEventListener('error', error => {
	console.log('Ошибка:', error.data);
});

document.addEventListener('click', event => {
	let obj = {'x': event.pageX, 'y': event.pageY};
	connection.send(JSON.stringify(obj));
})