	'use strict';
	const singInForm = document.querySelector('.sign-in-htm'),
		singUpForm = document.querySelector('.sign-up-htm');

	singInForm.addEventListener('submit', singIn);
	singUpForm.addEventListener('submit', singUp);

	function singIn(event) {
		event.preventDefault();
		const formDataSingIn = new FormData(singInForm);
		const formData = {};

		for (const [key, value] of formDataSingIn) {
			formData[key] = value;
		}

		fetch('https://neto-api.herokuapp.com/signin', {
			body: JSON.stringify(formData),
			credentials: 'same-origin',
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => {
				if (200 <= res.status && res.status < 300) {
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
		let inputs = event.target.querySelectorAll('input');		
		const formDataSingUp = new FormData(singUpForm);
		const formData = {};

		for (const [key, value] of formDataSingUp) {
			formData[key] = value;
		}

		fetch('https://neto-api.herokuapp.com/signup', {
			body: JSON.stringify(formData),
			credentials: 'same-origin',
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => {
				if (200 <= res.status && res.status < 300) {
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