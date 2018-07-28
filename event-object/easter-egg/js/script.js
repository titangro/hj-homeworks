'use scrict';
const nav = document.getElementsByTagName('nav')[0];
function showPanel(event) {
	if (event.ctrlKey && event.altKey && event.code === 'KeyT' && !event.repeat) {
		nav.classList.toggle('visible');
	}
}
let key = [];
if (Array.isArray(key)) {
	console.log('Введите секретный код');
}
function showSecret(event) {	
	key.push(event.code);
	console.log(key)
	if (key[0] === 'KeyY' && key[1] === 'KeyT' && key[2] === 'KeyN' && key[3] === 'KeyJ' && key[4] === 'KeyK' && key[5] === 'KeyJ' && key[6] === 'KeyU' && key[7] === 'KeyB' && key[8] === 'KeyZ') {
		document.getElementsByClassName('secret')[0].classList.toggle('visible');
	}
	if (key.length > 8 || key[0] !== 'KeyY' && !!key[0] || key[1] !== 'KeyT' && !!key[1] || key[2] !== 'KeyN' && !!key[2] || key[3] !== 'KeyJ' && !!key[3] || key[4] !== 'KeyK' && !!key[4] || key[5] !== 'KeyJ' && !!key[5] || key[6] !== 'KeyU' && !!key[6] || key[7] !== 'KeyB' && !!key[7] || key[8] !== 'KeyZ' && !!key[8]) {
		console.log('Попробуйте ввести секретный код заново');
		key = [];
	}	
}
document.addEventListener('keydown', showPanel);
document.addEventListener('keydown', showSecret);