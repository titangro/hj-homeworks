'use scrict';
function showSecret(event) {
	if (!event.ctrlKey) {
		return;
	}
	if (!event.altKey) {
		return;
	}
	switch (event.code) {
		case 'KeyT':
			document.getElementsByClassName('secret')[0].classList.add('visible');
		break;				
	}
 	
}
document.addEventListener('keydown', showSecret);
document.addEventListener('keyup', () => document.getElementsByClassName('secret')[0].classList.remove('visible'));