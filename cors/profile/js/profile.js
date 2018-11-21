'use strict';

function loadData(url) {
	const functionName = 'parser';
	return new Promise((done,fail) => {
		window[functionName] = done;	

		const script = document.scripts[0].cloneNode();
		script.src = `${url}?callback=${functionName}`;
		document.body.appendChild(script);		
	});
}

function loadTech(id) {
	const functionName = 'parserTech';
	return new Promise((done,fail) => {
		window[functionName] = done;	

		const script = document.scripts[0].cloneNode();
		script.src = `https://neto-api.herokuapp.com/profile/${id}/technologies?callback=${functionName}`;
		document.body.appendChild(script);		
	});
}

function showUser(user) {
	//document.querySelector('*[data-username]').textContent = user.id;
	document.querySelector('*[data-name]').textContent = user.name;
	document.querySelector('*[data-description]').textContent = user.description;
	document.querySelector('*[data-position]').textContent = user.position;
	document.querySelector('*[data-pic]').src = user.pic;
	document.querySelector('*[data-technologies]').innerHTML;

	loadTech(user.id)
	.then(newParserTech())
	.then(showTech())
	.catch(e => {console.log(e)})	
}

function showTech() {
	let result = ''
	let techs = newParserTech();
	for (let item of techs) {
		result += `<span class="devicons devicons-${item}"></span>`;
	}
	document.querySelector('*[data-technologies]').innerHTML = result;		
	document.querySelector('.content').style.display = 'initial';
}

loadData('https://neto-api.herokuapp.com/profile/me')
	.then(showUser(newParser()))
	.catch((error) => {console.log(error)})

function newParser() {
	return JSON.parse(`{"id":90210,"name":"Francesco Moustache","position":"Python Ninja","description":"Lived all my life on the top of mount Fuji, learning the way to be a Ninja Dev.","pic":"https://neto-api.herokuapp.com/hj/4.1/profile/128.jpg"}`);
}
function newParserTech() {
	return JSON.parse(`["django","python","codepen","javascript_badge","gulp","angular","sass"]`);
}
