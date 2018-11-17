'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('open', () => {		
});

connection.addEventListener('message', event => {	
	let message = JSON.parse(event.data);
	if (message.connections) {
		document.querySelector('.counter').textContent = message.connections;
	}
	if (message.errors) {
		document.querySelector('output.errors').textContent = message.errors;
	}
});

connection.addEventListener('error', error => {
	console.log('Ошибка:', error.data);
});

window.addEventListener('beforeunload', event => {	
	connection.addEventListener('close', event => {
		console.log('Соединение закрыто', event);
	});
	connection.close(1000);		
});