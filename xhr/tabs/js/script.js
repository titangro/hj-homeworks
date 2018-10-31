'use strict';
const xhr = new XMLHttpRequest(),
	buttons = document.querySelectorAll('a'),
	shower = document.getElementById('content'),
	loading = document.getElementById('preloader');

openXhr(document.querySelector('.email').getAttribute('href'));

xhr.addEventListener('load', onLoad);
xhr.addEventListener('loadstart', onLoadStart);
xhr.addEventListener('loadend', onLoadEnd);

Array.from(buttons).forEach( item => {
	item.addEventListener('click', changeShower)
});

function openXhr(href) {
	xhr.open('GET', href, true);
	xhr.send();
}

function onLoad(event) {
	let { responseText } = event.target;
	shower.innerHTML = responseText;
}

function changeShower(event) {
	event.preventDefault();
	openXhr(event.target.href);
	Array.from(buttons).forEach( item => {
		item.classList.remove('active');
	});
	event.target.classList.add('active');
}

function onLoadStart() {
	loading.classList.remove('hidden');
}

function onLoadEnd() {
	setTimeout(50);
	setInterval(() => {loading.classList.add('hidden')}, 1000) ;
}