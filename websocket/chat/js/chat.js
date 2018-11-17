'use strict';

const chat = document.querySelector('.chat'),
	chatStatus = chat.querySelector('.chat-status'),
	messageSubmit = chat.querySelector('.message-submit'),
	messagesContent = chat.querySelector('.messages-content'),
	templates = chat.querySelector('.messages-templates'),
	messageBox = chat.querySelector('.message-box')

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
messageBox.addEventListener('submit', sendMessage)

connection.addEventListener('open', () => {
	console.log('Соединение установлено');		
	changeStatus('online');
	showNotice('Пользователь появился в сети');
});

connection.addEventListener('message', message => {
	if (message.data == '...') {
		showLoading('Пользователь печатает сообщение...');
	} else {
		deleteLoading();
		showMessage(message);
	}
});

connection.addEventListener('error', error => {
	console.log('Ошибка:', error.data);
});

connection.addEventListener('close', event => {
	changeStatus('offline');
	console.log('Соединение закрыто');
	showNotice('Пользователь не в сети');
});

function changeStatus(status) {
	chatStatus.textContent = chatStatus.dataset[status];
	if (status === 'online') {
		messageSubmit.disabled =  false;
	} else {
		messageSubmit.disabled =  true;
	}	
}

function showNotice(message) {
	const messageStatus = templates.querySelector('.message-status').cloneNode(true);
	messageStatus.querySelector('.message-text').textContent = message;
	messagesContent.appendChild(messageStatus);
}

function showLoading(message) {
	const messageLoading = templates.querySelector('.loading').cloneNode(true);
	messageLoading.textContent = message;
	messagesContent.appendChild(messageLoading);
}

function deleteLoading() {
	const messageLoading = messagesContent.querySelector('.loading');
	if (messagesContent.querySelector('.loading')) {
		messagesContent.removeChild(messageLoading);
	}
}

function showMessage(message) {
	showLoading('Пользователь печатает сообщение...');
	setTimeout(() => {
		deleteLoading();
		console.log(message.data, message.timeStamp);
		let messageUser;
		Array.from(templates.querySelectorAll('.message')).forEach(item => {		
			if (item.classList.length === 1) {
				messageUser = item.cloneNode(true)
			}
		})	
		messageUser.querySelector('.message-text').textContent = message.data;
		messageUser.querySelector('.timestamp').textContent = showMesTime();
		messagesContent.appendChild(messageUser);

		let count = 0;
		Array.from(messagesContent.children).forEach(item => {
			if (item.classList.length === 1) {
				count++;
			}
		});
		if(count === 8) {
			connection.close(1000);
		}	
	}, message.timeStamp);	
}

function showMessagePersonal(message) {	
	console.log(message);
	const messagePersonal = templates.querySelector('.message-personal').cloneNode(true);
	messagePersonal.querySelector('.message-text').textContent = message;
	messagePersonal.querySelector('.timestamp').textContent = showMesTime();
	messagesContent.appendChild(messagePersonal);
}

function showMesTime() {
	const date = new Date(Date.now());
	let hours = date.getHours(),
		minutes = date.getMinutes();

	hours = '0' + hours;
	if (hours.length > 2) {
		hours = hours.slice(1);
	}
	minutes = '0' + minutes;
	if (minutes.length > 2) {
		minutes = minutes.slice(1);
	}
	return hours + ':' + minutes;
}

function sendMessage(event) {
	event.preventDefault();	
	let message = messageBox.querySelector('.message-input');
	if (message.value) {		
		showMessagePersonal(message.value);
		connection.send(message.value);
		message.value = '';
		showLoading('Пользователь печатает сообщение...');
	}		
}