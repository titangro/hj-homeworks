'use strict'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];
const widthCanvas = canvas.width;
const heightCanvas = canvas.height;

document.addEventListener('DOMContentLoaded', ganerateStars);
canvas.addEventListener('click', ganerateStars);

function ganerateStars(event) {
	ctx.beginPath();	
	ctx.fillStyle = 'black';	
	ctx.fillRect(0, 0, widthCanvas, heightCanvas);
	ctx.closePath();
	const count = randomRange(200, 400);
	let beginNum = 0;	
	while (beginNum < count) {
		showStar();
		beginNum++;
	}
	//showStar1(100, 100, 10);
}

function showStar(x = randomRange(0, widthCanvas),
				  y = randomRange(0, heightCanvas),
				  r = randomRange(0, 11)/10) {	
	ctx.beginPath();
	ctx.fillStyle = colors[randomRange(0,2)];
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.globalAlpha = randomRange(8, 10)/10;
	ctx.fill();
	ctx.closePath();
}

/*function showStar1(x = randomRange(0, 300),
				  y = randomRange(0, 150),
				  r = randomRange(0, 11)/10) {	
	ctx.beginPath();
	ctx.fillStyle = colors[randomRange(0,2)];
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.globalAlpha = randomRange(8, 10)/10;
	
	ctx.clip('evenodd');	
	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.moveTo(x - r, y + r);
	ctx.lineTo(x + r, y - r/3);
	ctx.lineTo(x - r, y - r/3);
	ctx.lineTo(x + r, y + r);
	ctx.lineTo(x, y - r);
	ctx.closePath();
	ctx.fill();	
}*/

function randomRange(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min))
}
