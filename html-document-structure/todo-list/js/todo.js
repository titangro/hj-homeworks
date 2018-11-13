'use strict';
const done = document.querySelector('.done');
const undone = document.querySelector('.undone');
const todoList = document.querySelectorAll('label input');
Array.from(todoList).forEach(item => item.addEventListener('click', changeLocation));

function changeLocation(event) {
	const currentElement = event.currentTarget.parentElement;	
	if (currentElement.parentElement.nextElementSibling) {
		event.target.checked = false;
		undone.appendChild(currentElement);
	} else {
		event.target.checked = true;
		done.appendChild(currentElement);
	}
}