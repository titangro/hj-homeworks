'use strict';

let movedLogo = null;
let shiftX = 0;
let shiftY = 0;

document.addEventListener('mousedown', (event) => {
	event.preventDefault();
	if (event.target.classList.contains('logo')) {					
		const bounds = event.target.getBoundingClientRect();
		shiftX = event.pageX - bounds.left - window.pageXOffset;
		shiftY = event.pageY - bounds.top - window.pageYOffset;
		movedLogo = event.target;		
	}
});
document.addEventListener('mousemove', (event) => {
	if (movedLogo) {
		event.preventDefault();
		let body = document.querySelector('body');
		let x = event.pageX - shiftX;
		let y = event.pageY - shiftY;

		x = Math.min(x, document.documentElement.clientWidth);
		y = Math.min(y, document.documentElement.clientHeight);
		x = Math.max(x, body.offsetLeft);
		y = Math.max(y, body.offsetTop);

		movedLogo.style.left = x + 'px';
		movedLogo.style.top	= y + 'px';
		movedLogo.classList.add('moving');	
	}
});
document.addEventListener('mouseup', (event) => {
	if (movedLogo) {
		event.preventDefault();
		movedLogo.style.visibility = 'hidden';
		let cart = document.elementFromPoint(event.clientX, event.clientY);		
		if (cart.id === 'trash_bin') {
			movedLogo.style.display = 'none';
		}	
		movedLogo.style.visibility = 'visible';
		movedLogo.classList.remove('moving');
		movedLogo = null;
	}	
})