'use strict';

const wall = document.querySelector('#wall');
const ctx = wall.getContext('2d');
const size = randomRange(1, 6)/10;

document.addEventListener('DOMContentLoaded', ganerateBackground);

function ganerateBackground() {
	
	const count = randomRange(50, 200);
	let beginNum = 0;	
	while (beginNum < count) {
		if (beginNum % 2) {
			showCircle( randomRange(0, wall.width),
						randomRange(0, wall.height),
						size);
		} else {
			showCross(randomRange(0, wall.width),
					  randomRange(0, wall.height),
					  size);
		}
		beginNum++;
	}
}

function showCircle(x, y, size) {
	ctx.beginPath();
	ctx.strokeStyle = 'white';
	ctx.arc(x, y, 12 * size, 0, 2 * Math.PI);
	ctx.lineWidth = 5 * size;
	ctx.stroke();
	ctx.closePath();
}

function showCross(x, y, size) {
	ctx.beginPath();
	ctx.strokeStyle = 'white';
	ctx.moveTo(x, y);
	ctx.lineTo(x, y - 10 * size);
	ctx.lineTo(x, y + 10 * size);
	ctx.lineTo(x, y);
	ctx.lineTo(x - 10 * size, y);
	ctx.lineTo(x + 10 * size, y);	
	ctx.lineWidth = 5 * size;
	ctx.stroke();
	ctx.closePath();
}

//const { x, y } = nextPoint(100, 100, Date.now());

function nextPoint(x, y, time) {	
	if (randomRange(0, 1)) {
		return {
		    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
		    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
		};
	} else {
		return {
		    x: x + Math.sin((x + (time / 10)) / 100) * 5,
		    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
		}
	}
}

function randomRange(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min))
}