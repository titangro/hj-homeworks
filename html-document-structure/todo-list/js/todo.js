'use strict';
const done = document.querySelector('.done');
const undone = document.querySelector('.undone');
const todoList = document.querySelectorAll('label input');
Array.from(todoList).forEach(item => item.addEventListener('click', changeLocation));

function changeLocation(event) {
	const currentElement = event.currentTarget.parentElement;	
	if (event.target.checked) {
		done.appendChild(currentElement);
	} else {
		event.target.checked = true;
		undone.appendChild(currentElement);
	}
}