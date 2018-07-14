'use strict';
const xhr = new XMLHttpRequest(),
	content = document.getElementById('content'),
	card = document.getElementById('card');

content.innerHTML = "";

xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();

xhr.addEventListener('load', onLoad);

function onLoad() {
	const books = JSON.parse(xhr.responseText);
	console.log(books)	
	for (let i = 0; i < books.length; i++) {
		content.innerHTML += '<li><img></li>';
		const item = document.getElementsByTagName('li')[i],
			img = document.getElementsByTagName('img')[i];
		console.log(item, img);
		item.dataset.title = books[i].title;
		item.dataset.author = books[i].author.name;
		item.dataset.info = books[i].info;
		item.dataset.price = books[i].price;
		img.src = books[i].cover.small;
	}	
}



let inner = '<li title info price><img src></li>';
