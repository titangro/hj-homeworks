'use strict';
const singInForm = document.querySelector('.sign-in-htm'),
	singUpForm = document.querySelector('.sign-up-htm');

singUpForm.addEventListener('submit', singUp);
singInForm.addEventListener('submit', singIn);

function singIn(event) {
	event.preventDefault();
	const formDataSingIn = new FormData(singInForm);	
	fetch('https://neto-api.herokuapp.com/signin', {
		body: JSON.stringify(formDataSingIn),
		credentials: 'same-origin',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	})
		.then((res) => {
			if (200 <= res.status && res.status < 300) {
				console.log(res)			
				return res;
			}
			throw new Error(response.statusText);
		})
		.then((res) => { return res.json(); })
		.then((data) => {
			if (data.error) {
				throw new Error(data.message);
			}
			singInForm.querySelector('.error-message').textContent = `Пользователь ${data.name} успешно авторизован`;
		})
		.catch((error) => {
			console.log(error, error.error);
			singInForm.querySelector('.error-message').textContent = error.message;
		});
};

function singUp(event) {
	event.preventDefault();
	const formDataSingUp = new FormData(singUpForm);
	const form = new FormData()
	for (const [key, value] of formDataSingUp) {
		form.append('key', 'value');
	}
	console.log(form)
	fetch('https://neto-api.herokuapp.com/signup', {
		body: JSON.stringify(form),
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((res) => {
			if (200 <= res.status && res.status < 300) {
				console.log(res)
				return res;
			}
			throw new Error(response.statusText);
		})
		.then((res) => { return res.json(); })
		.then((data) => {
			if (data.error) {
				throw new Error(data.message);
			}
			singUpForm.querySelector('.error-message').textContent = `Пользователь ${data.name} успешно зарегистрирован`;
		})
		.catch((error) => {
			console.log(error, error.error);
			singUpForm.querySelector('.error-message').textContent = error.message;
		});
}