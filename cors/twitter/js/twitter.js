'use strict';

let random = randName();

function loadData(url) {
	const functionName = random;
	return new Promise((done,fail) => {
		window[functionName] = done;	

		const script = document.createElement('script');
		script.src = `${url}?callback=${functionName}`;
		document.body.appendChild(script);		
	});
}

function parseTwitt(twitt) {
	document.querySelector('*[data-username]').textContent = twitt.username;
	document.querySelector('*[data-description]').textContent = twitt.description;
	document.querySelector('*[data-tweets]').textContent = twitt.tweets;
	document.querySelector('*[data-followers]').textContent = twitt.followers;
	document.querySelector('*[data-following]').textContent = twitt.following;
	document.querySelector('*[data-wallpaper]').src = twitt.wallpaper;
	document.querySelector('*[data-pic]').src = twitt.pic;
}

function randName() {
	let str = '';
	let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	for (let i = 0; i < 7; i++) {
		str += string.charAt(Math.floor(Math.random() * string.length))
	}
	return str;
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
	.then(data => {parseTwitt(data)})
	.catch((error) => {console.log(error)})