'use strict';
const contentform = document.querySelector('.contentform'),
	buttonSubmit = document.querySelector('.contentform .button-contact'),
	buttonChange = document.querySelector('#output .button-contact'),
	result = document.getElementById('output'),
	formInputs = contentform.querySelectorAll('input'),
	messageArea = contentform.querySelector('textarea');

for (let input of formInputs) {
	input.addEventListener('input', activateSubmit);
	input.addEventListener('input', inputData);
}

document.querySelector('.contentform input[name = "zip"]').addEventListener('input', checkIndex);
buttonSubmit.addEventListener('click', showMessage);
buttonChange.addEventListener('click', showForm);
document.addEventListener('load', inputData);
document.addEventListener('load', activateSubmit);
messageArea.addEventListener('input', activateSubmit)

function activateSubmit() {
	for (let input of formInputs) {
		if (input.value === "" || messageArea.value === "") {
			return buttonSubmit.disabled = true;
		}
	}
	buttonSubmit.disabled = false;
}

function checkIndex(event) {
	let number = +event.currentTarget.value,
		item = event.currentTarget;
	if (Number.isNaN(number)) {
		item.value = item.value.slice(0, item.value.length - 1);
	}
}

function showMessage(event) {
	event.preventDefault();
	contentform.classList.add('hidden');
	result.classList.remove('hidden');
}

function showForm(event) {
	event.preventDefault();
	result.classList.add('hidden');
	contentform.classList.remove('hidden');	
}

function inputData() {
	result.querySelector('#name').value = contentform.querySelector('input[name = "name"]').value;
	result.querySelector('#lastname').value = contentform.querySelector('input[name = "lastname"]').value;
	result.querySelector('#company').value = contentform.querySelector('input[name = "company"]').value;
	result.querySelector('#role').value = contentform.querySelector('input[name = "role"]').value;
	result.querySelector('#zip').value = contentform.querySelector('input[name = "zip"]').value;
	result.querySelector('#city').value = contentform.querySelector('input[name = "city"]').value;
	result.querySelector('#address').value = contentform.querySelector('input[name = "address"]').value;
	result.querySelector('#subject').value = contentform.querySelector('input[name = "subject"]').value;
	result.querySelector('#message').value = contentform.querySelector('textarea[name = "message"]').value;
}
