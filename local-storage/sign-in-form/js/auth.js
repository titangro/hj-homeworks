'use strict';
const singInForm = document.querySelector('.sign-in-htm'),
	singUpForm = document.querySelector('.sign-up-htm');

const formDataSingIn = new FormData(singInForm);
const formDataSingUp = new FormData(singUpForm);
for (const [key, value] of formDataSingIn) {
	console.log(key + ': ' + value)
}

const requestSingIn = fetch('https://neto-api.herokuapp.com/signin', {
	body: JSON.stringify({formDataSingIn}),
	credentials: 'same-origin',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
})
	.then((res) => {
		if (200 <= res.status && res.status < 300) {
			return res;
		}
		throw new Error(response.statusText);
	})
	.then((res) => { return res.json(); })
	.then((data) => {
		singInForm.querySelector('.error-message').textContent = `Пользователь ${data.name} успешно авторизован`;
	})
	.catch((error) => {
		console.log(error, error.error)
		singInForm.querySelector('.error-message').textContent = error.message;
	});

const requestSingUp = fetch('https://neto-api.herokuapp.com/signup', {
	body: JSON.stringify({formDataSingUp}),
	credentials: 'same-origin',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
})
	.then((res) => {
		if (200 <= res.status && res.status < 300) {
			return res;
		}
		throw new Error(response.statusText);
	})
	.then((res) => { return res.json(); })
	.then((data) => {
		singUpForm.querySelector('.error-message').textContent = `Пользователь ${data.name} успешно зарегистрирован`;
	})
	.catch((error) => {
		console.log(error, error.error)
		singUpForm.querySelector('.error-message').textContent = error.message;
	});