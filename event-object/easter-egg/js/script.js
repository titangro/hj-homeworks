'use scrict';
const nav = document.getElementsByTagName('nav')[0];
function showPanel(event) {
	if (event.ctrlKey && event.altKey && event.code === 'KeyT' && !event.repeat) {
		nav.classList.toggle('visible');
	}
}
let key = [],
	secretKey = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
if (Array.isArray(key)) {
	console.log('Введите секретный код');
}
function showSecret(event) {	
	key.push(event.code);	
	if (isSecret()) {
		if (key.length === secretKey.length) {
			document.getElementsByClassName('secret')[0].classList.toggle('visible');
			key = [];
		}
	} else {
		console.log('Попробуйте ввести секретный код заново');
		key = [];
	}
}

function isSecret() {
	for (let i = 0; i < secretKey.length; i++) {
		return key[i] === secretKey[i]; 	
	}
}

document.addEventListener('keydown', showPanel);
document.addEventListener('keydown', showSecret);