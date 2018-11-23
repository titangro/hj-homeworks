'use strict';

loadData('https://neto-api.herokuapp.com/profile/me')
	.then(data => {showUser(data)})
	.catch((error) => {console.log(error)})

function loadData(url) {
	const random = randName()
	const functionName = random;
	return new Promise((done,fail) => {
		window[functionName] = done;	

		const script = document.createElement('script');
		script.src = `${url}?callback=${functionName}`;
		document.body.appendChild(script);	
	});
}

function loadTech(id) {
	const functionName = randName();
	return new Promise((done,fail) => {
		window[functionName] = done;	

		const script = document.createElement('script');
		script.src = `https://neto-api.herokuapp.com/profile/${id}/technologies?callback=${functionName}`;				
		document.body.appendChild(script);
	});
}

function showUser(user) {	
	document.querySelector('*[data-name]').textContent = user.name;
	document.querySelector('*[data-description]').textContent = user.description;
	document.querySelector('*[data-position]').textContent = user.position;
	document.querySelector('*[data-pic]').src = user.pic;
	document.querySelector('*[data-technologies]').innerHTML;

	loadTech(user.id)
	.then(data => {showTech(data)})
	.catch(e => {console.log(e)})	
}

function showTech(techs) {
	let result = ''
	for (let item of techs) {
		result += `<span class="devicons devicons-${item}"></span>`;
	}
	document.querySelector('*[data-technologies]').innerHTML = result;		
	document.querySelector('.content').style.display = 'initial';
}

function randName() {
	let str = '';
	let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	for (let i = 0; i < 7; i++) {
		str += string.charAt(Math.floor(Math.random() * string.length))
	}
	return str;
}