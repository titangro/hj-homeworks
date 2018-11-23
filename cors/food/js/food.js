'use strict';

Promise.all(
	[loadData('https://neto-api.herokuapp.com/food/42'),
	loadRating('https://neto-api.herokuapp.com/food/42/rating'),
	loadConsumers('https://neto-api.herokuapp.com/food/42/consumers')])
	.then((data) => {
		showRecipe(data[0]);
		showRating(data[1]);
		showConsumers(data[2]);
	})
	.catch((error) => {console.log(error)})

function loadData(url) {	
	return loadPromise(url);
}

function loadRating(url) {	
	return loadPromise(url);
}

function loadConsumers(url) {	
	return loadPromise(url);	
}

function loadPromise(url) {
	const functionName = randName();
	return new Promise((done,fail) => {
		window[functionName] = done;	

		const script = document.createElement('script');
		script.src = `${url}?callback=${functionName}`;
		document.body.appendChild(script);
	});
}

function showRecipe(recipe) {	
	document.querySelector('*[data-title]').textContent = recipe.title;
	document.querySelector('*[data-title]').dataset.title = recipe.title;
	const ingredients = document.querySelector('*[data-ingredients]');
	for (let i = 0; i < recipe.ingredients.length; i++) {
		if 	(i < recipe.ingredients.length - 1) {	
			ingredients.textContent += recipe.ingredients[i] + ', ';
		} else {
			ingredients.textContent += recipe.ingredients[i];	
		}
	}
	ingredients.dataset.ingredients = recipe.ingredients;
	document.querySelector('*[data-pic]').dataset.pic = recipe.pic;
	document.querySelector('*[data-pic]').style.backgroundImage = `url(${recipe.pic})`;			
}

function showRating(rating) {
	document.querySelector('*[data-rating]').dataset.rating = rating.rating.toFixed(2);
	document.querySelector('*[data-rating]').textContent = rating.rating.toFixed(2);
	document.querySelector('*[data-votes]').dataset.votes = rating.votes;
	document.querySelector('*[data-votes]').textContent = rating.votes + ' оценок';	

	let rate = document.querySelector('*[data-rating]').dataset.rating;
	document.querySelector('*[data-star]').style.width = (+rate / 10 * 100) + '%';
	document.querySelector('*[data-star]').dataset.star = (+rate / 10 * 100) + '%';
}

function showConsumers(consumers) {
	for (const item of consumers.consumers) {
		let img = `<img src="${item.pic}" title="${item.name}">`
		document.querySelector('*[data-consumers]').innerHTML += img;
	}
	let others = consumers.consumers.length - consumers.total;
	document.querySelector('*[data-consumers]').innerHTML += `<span>(+${others})</span>`;	
}

function randName() {
	let str = '';
	let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	for (let i = 0; i < 7; i++) {
		str += string.charAt(Math.floor(Math.random() * string.length))
	}
	return str;
}