'use strict';
const beginningHref = 'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/',
sounds = ['/first.mp3','/second.mp3','/third.mp3','/fourth.mp3','/fifth.mp3'],
piano = document.getElementsByClassName('set')[0],
buttons = document.getElementsByTagName('li'),
players = document.getElementsByTagName('audio');
function playPiano() {
	let currentSet = piano.classList[1];
	for (let i = 0; i < buttons.length; i++) {
		players[i].src = beginningHref + currentSet + sounds[i];
		buttons[i].addEventListener('click', (event) => {
			event.preventDefault();
			players[i].currentTime = 0;
			players[i].play();
		})
	}
}
const bindingsDown = {
	AltLeft() {		
		piano.classList.remove('middle');
		piano.classList.add('higher');			
	},
	ShiftLeft() {
		piano.classList.remove('middle');
		piano.classList.add('lower');		
	}
};
const bindingsUp = {
	AltLeft() {	
		piano.classList.remove('higher');
		piano.classList.add('middle');			
	},
	ShiftLeft() {
		piano.classList.remove('lower');
		piano.classList.add('middle');		
	}
};
function updatePlayer(event) {	
	if (event.type === "keydown") {
		if (event.code in bindingsDown) {			
			bindingsDown[event.code]();			
		}
	} else {
		if (event.code in bindingsUp) {
			bindingsUp[event.code]();			
		}		
	}
	playPiano();
}
playPiano();
document.addEventListener('keydown', updatePlayer)
document.addEventListener('keyup', updatePlayer)