'use strict';
const xhrEmail = new XMLHttpRequest(),
	xhrSms = new XMLHttpRequest(),
	emailButton = document.querySelector('.email'),
	smsButton = document.querySelector('.sms'),
	shower = document.getElementById('content'),
	hrefEmail = emailButton.getAttribute('href'),
	hrefSms = smsButton.getAttribute('href'),
	loading = document.getElementById('preloader');

xhrEmail.open('GET', hrefEmail, true);
xhrEmail.send();
xhrSms.open('GET', hrefSms, true);
xhrSms.send();

xhrEmail.addEventListener('readystatechange', onReadyStateChange);
emailButton.addEventListener('click', onClickChangeToEmail);
smsButton.addEventListener('click', onClickChangeToSms);
xhrEmail.addEventListenr('loadstart', onLoadStart);
xhrEmail.addEventListenr('loadend', onLoadEnd);
emailButton.addEventListenr('loadstart', onLoadStart);
emailButton.addEventListenr('loadend', onLoadEnd);
smsButton.addEventListenr('loadstart', onLoadStart);
smsButton.addEventListenr('loadend', onLoadEnd);

function onReadyStateChange(event) {
	if (event.target.readyState != 4) {
		return;
	}
	if (event.target.status === 200) {
	 	shower.innerHTML = event.target.responseText;
	}	
}

function onClickChangeToEmail(event) {
	event.preventDefault();
	xhrEmail.open('GET', hrefEmail, true);
	xhrEmail.send();
	emailButton.classList.add('active');
	smsButton.classList.remove('active');
}

function onClickChangeToSms(event) {
	event.preventDefault();
	shower.innerHTML = xhrSms.responseText;
	smsButton.classList.add('active');
	emailButton.classList.remove('active');
}

function onLoadStart() {
	loading.classList.remove('hidden');
}

function onLoadEnd() {
	loading.classList.add('hidden');
}

