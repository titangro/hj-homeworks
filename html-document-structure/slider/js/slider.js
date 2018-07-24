'use strict';
const buttons = document.querySelectorAll('.slider-nav a');
const sliders = document.querySelectorAll('.slides .slide');
const next = document.querySelector('[data-action="next"]');
const prev = document.querySelector('[data-action="prev"]');
const first = document.querySelector('[data-action="first"]');
const last = document.querySelector('[data-action="last"]');
sliders[0].classList.add('slide-current');
prev.classList.add('disabled');
first.classList.add('disabled');
next.addEventListener('click', event => moveSlide(true, false, event));
last.addEventListener('click', event => moveSlide(true, true, event));
prev.addEventListener('click', event => moveSlide(false, false, event));
first.addEventListener('click', event => moveSlide(false, true, event));

function moveSlide(isForward, toTail, event) {
	if (event.currentTarget.classList.contains('disabled')) return;
 	const currentSlide = document.querySelector('.slide-current');    
    let activatedSlide = currentSlide.nextElementSibling;    
    if (toTail) {
    	activatedSlide = isForward ? currentSlide.parentElement.lastElementChild : currentSlide.parentElement.firstElementChild;
    	currentSlide.classList.remove('slide-current');
    	activatedSlide.classList.add('slide-current');    	
    } else {
    	if (isForward) {
    		activatedSlide = currentSlide.nextElementSibling;
    	} else {
    		activatedSlide = currentSlide.previousElementSibling;
    	}
    	activatedSlide.classList.add('slide-current');
    	currentSlide.classList.remove('slide-current');    	
    }    
	if (activatedSlide.nextElementSibling) {
		next.classList.remove('disabled');
		last.classList.remove('disabled');
	} else {
		next.classList.add('disabled');
		last.classList.add('disabled');
	}
	if (activatedSlide.previousElementSibling) {
		prev.classList.remove('disabled');
		first.classList.remove('disabled');
	} else {
		prev.classList.add('disabled');
		first.classList.add('disabled');
	}        	
}   	
