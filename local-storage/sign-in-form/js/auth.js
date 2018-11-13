'use strict';
const singInForm = document.querySelector('.sign-in-htm'),
	singUpForm = document.querySelector('.sign-up-htm');

singInForm.addEventListener('submit', () => {
	const formDataSingIn = new FormData(singInForm);	
	fetch('https://neto-api.herokuapp.com/signin', {
		body: JSON.stringify({formDataSingIn}),
		credentials: 'same-origin',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	})
		.then((res) => {
			if (200 <= res.status && res.status < 300) {
				console.log(res);
				return res;
			}
			throw new Error(response.statusText);
		})
		.then((res) => { return JSON.parse(res); })
		.then((data) => {
			singInForm.querySelector('.error-message').textContent = `Пользователь ${data.name} успешно авторизован`;
		})
		.catch((error) => {
			console.log(error, error.error);
			singInForm.querySelector('.error-message').textContent = error.message;
		});
});

singUpForm.addEventListener('submit', () => {
	const formDataSingUp = new FormData(singUpForm);
	for (const [key, value] of formDataSingUp) {
		console.log(key + ': ' + value);
	}
	fetch('https://neto-api.herokuapp.com/signup', {
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
		.then((res) => { return JSON.parse(res); })
		.then((data) => {
			singUpForm.querySelector('.error-message').textContent = `Пользователь ${data.name} успешно зарегистрирован`;
		})
		.catch((error) => {
			console.log(error, error.error);
			singUpForm.querySelector('.error-message').textContent = error.message;
		});
});