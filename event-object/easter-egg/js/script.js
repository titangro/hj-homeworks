'use scrict';
function showPanel(event) {
	if (!event.ctrlKey) {
		return;
	}
	if (!event.altKey) {
		return;
	}
	switch (event.code) {
		case 'KeyT':
			document.getElementsByTagName('nav')[0].classList.add('visible');
		break;				
	}
 	
}
let key = "";
if (key === "") {
	console.log('Введите секретный код');
}
function showSecret(event) {	
	key += event.key;
	if (key === 'ytnjkjubz') {
		document.addEventListener('keyup', () => document.getElementsByClassName('secret')[0].classList.add('visible'));	
		key = "";
	} else {
		if (key.length > 8) {
			key = "";
			console.log('Попробуйте ввести секретный код заново')
		}
		document.addEventListener('keyup', () => document.getElementsByClassName('secret')[0].classList.remove('visible'));
	}
}
document.addEventListener('keydown', showPanel);
document.addEventListener('keyup', () => document.getElementsByTagName('nav')[0].classList.remove('visible'));
document.addEventListener('keydown', showSecret);