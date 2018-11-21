'use strict';

function loadData(url) {
	const functionName = 'parser1';
	return loadPromise(functionName, url);
}

function loadRating(url) {
	const functionName = 'parser2';
	return loadPromise(functionName, url);
}

function loadConsumers(url) {
	const functionName = 'parser3';
	return loadPromise(functionName, url);	
}

function loadPromise(functionName, url) {	
	return new Promise((done,fail) => {
		window[functionName] = done;	

		const script = document.scripts[0].cloneNode();
		script.src = `${url}?callback=${functionName}`;
		document.body.appendChild(script);		
	});
}

function showRecipe(recipe) {
	//document.querySelector('*[data-username]').textContent = recipe.id;
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

	loadRating('https://neto-api.herokuapp.com/food/42/rating')
	.then(showRating(newParser2()))
	.then(loadConsumers('https://neto-api.herokuapp.com/food/42/consumers')
	.then(showConsumers(newParser3()))
	.catch(e => {console.log(e)}))	
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
	//consumers.name
	//consumers.pic
	console.log(consumers)
	for (const item of consumers.consumers) {
		let img = `<img src="${item.pic}" title="${item.name}">`
		document.querySelector('*[data-consumers]').innerHTML += img;
	}
	let others = consumers.consumers.length - consumers.total;
	document.querySelector('*[data-consumers]').innerHTML += `<span>(+${others})</span>`;	
}

loadData('https://neto-api.herokuapp.com/food/42')
	.then(showRecipe(newParser1()))
	.catch((error) => {console.log(error)})

function newParser1() {
	return JSON.parse(`{"id":42,"title":"Макарун","pic":"https://neto-api.herokuapp.com/hj/4.1/food/product.jpg","ingredients":["cахар","яичные белки","масло","соль","корица"]}`);
}
function newParser2() {
	return JSON.parse(`{"rating":9.1,"votes":320}`);
}
function newParser3() {
	return JSON.parse(`{"consumers":[{"name":"Аманда","pic":"https://neto-api.herokuapp.com/hj/4.1/food/user1.jpg"},{"name":"Виктория","pic":"https://neto-api.herokuapp.com/hj/4.1/food/user2.jpg"},{"name":"Надежда","pic":"https://neto-api.herokuapp.com/hj/4.1/food/user3.jpg"},{"name":"Михаил","pic":"https://neto-api.herokuapp.com/hj/4.1/food/user4.jpg"}],"total":23}`);	
}