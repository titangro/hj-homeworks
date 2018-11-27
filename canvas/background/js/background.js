'use strict';

const wall = document.querySelector('#wall');
wall.width = document.documentElement.clientWidth;
wall.height = document.documentElement.clientHeight;
const ctx = wall.getContext('2d');
const size = randomRange(1, 6)/10;
const objects = [];
const count = randomRange(50, 200);

document.addEventListener('DOMContentLoaded', ganerateBackground);

animateBackground();

function animateBackground() {
	setInterval(function () {
		window.requestAnimationFrame(repaint);
	}, 50);
}

function ganerateBackground() {	
	let beginNum = 0;
	while (beginNum < count) {
		let x = randomRange(0, wall.width);
		let y = randomRange(0, wall.height);
		let time = Date.now() + randomRange(0, 10000);
		if (beginNum % 2) {
			showCircle(x, y);
			addObj(x, y, time, 'circle');
		} else {
			showCross(x, y, 45);
			addObj(x, y, time, 'cross');
		}
		beginNum++;
	}
}

function repaint () {
  	ctx.clearRect(0, 0, wall.width, wall.height);

  	objects
    	.forEach((item) => {
    		item.nextPoint();
    		if (item.type === 'circle') {
    			showCircle(item.x, item.y);    			
    		} else {
    			item.nextAngle();
    			showCross(item.x, item.y, item.angle);
    		} 	
    	});
}

function addObj(x, y, time, type, angle = randomRange(0, 360)) {
	if (type === 'circle') {
		objects.push({
			'x':x,
			'y':y,
			'nextPoint':function(){
				const { x, y } = nextPoint(this.x, this.y, time);			
				this.x = x;
				this.y = y;
			},
			'type':type,
		});
	} else {
		objects.push({
			'x':x,
			'y':y,
			'nextPoint':function(){
				const { x, y } = nextPoint(this.x, this.y, time);			
				this.x = x;
				this.y = y;
			},
			'type':type,
			'angle':angle,
			'nextAngle':function() {				
				const degree = randomRange(-2, 2)/10 * 180 / Math.PI;
				if (this.angle + degree > 360) {
					this.angle = 360 - this.angle + degree;
				} else if (this.angle + degree < 0) {
					this.angle = 360 + this.angle + degree
				} else {
					this.angle = this.angle + degree;
				}
			}
		});
	}
}

function showCircle(x, y) {
	ctx.beginPath();
	ctx.strokeStyle = 'white';
	ctx.arc(x, y, 12 * size, 0, 2 * Math.PI);
	ctx.lineWidth = 5 * size;
	ctx.stroke();
	ctx.closePath();
}

function showCross(x, y, degree) {
	const angle = degree * Math.PI / 180,
		r = Math.sqrt( x**2 + y**2 ),  
  		a = Math.atan( y / x ),
		x1 = r * Math.cos( a - angle ),
  		y1 = r * Math.sin( a - angle ); 
		
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 5 * size;	
	ctx.save();	
	
	ctx.beginPath();
	ctx.rotate(angle);
	ctx.moveTo(x1, y1);
	ctx.lineTo(x1, y1 - 10 * size);
	ctx.lineTo(x1, y1 + 10 * size);
	ctx.lineTo(x1, y1);
	ctx.lineTo(x1 - 10 * size, y1);
	ctx.lineTo(x1 + 10 * size, y1);	
	ctx.restore();
	ctx.stroke();
		
	ctx.closePath();
}

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