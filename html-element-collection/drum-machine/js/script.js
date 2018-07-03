'use strict';
const buttons = document.getElementsByClassName('drum-kit__drum');
function playDrum() {
	let key = this.className.split('-');
	key = key[key.length-1];
	document.getElementsByClassName('player '+key)[0].currentTime = 0;
	document.getElementsByClassName('player '+key)[0].play();
}
for (let button of buttons) {
	button.onclick = playDrum;
}