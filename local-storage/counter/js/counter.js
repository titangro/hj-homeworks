'use strict';
const counter = document.getElementById('counter'),
	increment = document.getElementById('increment'),
	decrement = document.getElementById('decrement'),
	reset = document.getElementById('reset');

if(!localStorage.count) {
	localStorage.count = 0;
}

counter.textContent = localStorage.count;

increment.addEventListener('click', increaseCounter);
decrement.addEventListener('click', decreaseCounter);
reset.addEventListener('click', resetCounter);

function increaseCounter(event) {
	localStorage.count = +localStorage.count + 1;
	counter.textContent = localStorage.count;
}

function decreaseCounter(event) {
	if (localStorage.count > 0) {
		localStorage.count = +localStorage.count - 1;
		counter.textContent = localStorage.count;
	}	
}

function resetCounter(event) {
	localStorage.count = 0;
	counter.textContent = localStorage.count;
}