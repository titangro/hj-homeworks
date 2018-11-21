'use strict';

let random = randName();

function loadData(url) {
	const functionName = 'parser';
	return new Promise((done,fail) => {
		window[functionName] = done;	

		const script = document.scripts[0].cloneNode();
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
	.then(parseTwitt(newParser()))
	.catch((error) => {console.log(error)})

function newParser() {
	return JSON.parse(`{"username":"@carlf","description":"Carl Fredricksen is the protagonist in Up. He also appeared in Dug's Special Mission as a minor character.","tweets":2934,"followers":1119,"following":530,"wallpaper":"https://neto-api.herokuapp.com/hj/4.1/twitter/up.jpg","pic":"https://neto-api.herokuapp.com/hj/4.1/twitter/carl.jpg"}`)
}