'use strict';
const buttons = document.querySelectorAll('.slider-nav a');
const sliders = document.querySelectorAll('.slides .slide');

sliders[0].classList.add('slide-current');
updateButtons();

Array.from(buttons).forEach(item => {
	item.addEventListener('click', moveSlide);
	item.addEventListener('click', updateButtons);
});

function moveSlide(event) {
	if (event.currentTarget.classList.contains('disabled')) return;
 	const currentSlide = document.querySelector('.slide-current');
    let activatedSlide = currentSlide.nextElementSibling;  

    switch (event.target.dataset.action) {
    	case 'prev': 
    		activatedSlide = currentSlide.previousElementSibling;    		
    		break;
    	case 'first': 
    		activatedSlide = currentSlide.parentElement.firstElementChild;    		
    		break;
    	case 'next': 
    		activatedSlide = currentSlide.nextElementSibling;    		
    		break;
    	case 'last': 
    		activatedSlide = currentSlide.parentElement.lastElementChild;    		
    		break;
    }
    activatedSlide.classList.add('slide-current');
    currentSlide.classList.remove('slide-current');
}

function updateButtons(event) {
	const currentSlide = document.querySelector('.slide-current');
	Array.from(buttons).forEach(item => {
		if(item.dataset.action === 'prev' || item.dataset.action === 'first') {
			if(!currentSlide.previousElementSibling) {
				item.classList.add('disabled');
			} else {
				item.classList.remove('disabled');
			}
		} else {
			if(!currentSlide.nextElementSibling) {
				item.classList.add('disabled');
			} else {
				item.classList.remove('disabled');
			}
		}
	});
}
