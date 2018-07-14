'use strict';
const xhrEmail = new XMLHttpRequest(),
	xhrSms = new XMLHttpRequest(),
	emailButton = document.querySelector('.email'),
	smsButton = document.querySelector('.sms'),
	shower = document.getElementById('content'),
	hrefEmail = emailButton.getAttribute('href'),
	hrefSms = smsButton.getAttribute('href');
xhrEmail.open('GET', hrefEmail, true);
xhrEmail.send();
xhrSms.open('GET', hrefSms, true);
xhrSms.send();	
xhrEmail.addEventListener('readystatechange', onReadyStateChange);
emailButton.addEventListener('click', onClickChangeToEmail);
smsButton.addEventListener('click', onClickChangeToSms);

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
}
function onClickChangeToSms(event) {
	event.preventDefault();
	shower.innerHTML = xhrSms.responseText;	
}

