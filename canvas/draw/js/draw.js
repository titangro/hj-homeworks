'use strict';

const draw = document.querySelector('#draw');
const ctx = draw.getContext('2d');

window.addEventListener('load', setSizes);
window.addEventListener('resize', setSizes);

let curves = [];
let drawing = false;
let needsRepaint = false;
let radius = 100;
let hue = 0;

draw.addEventListener('dblclick', event => {
	curves = [];
	needsRepaint = true;
	tick();
})
draw.addEventListener('mousedown', event => {
	drawing = true;	
	const curve = []; // create a new curve
	curve.push(pushPoint(event.offsetX, event.offsetY, hue, radius)); // add a new point
	curves.push(curve); // add the curve to the array of curves
  	needsRepaint = true;
})
draw.addEventListener('mouseup', event => {drawing = false;})
draw.addEventListener('mouseleave', event => {drawing = false;})
draw.addEventListener('mousemove', event => {
	if (drawing) {
    	const point = pushPoint(event.offsetX, event.offsetY, hue, radius)
    	curves[curves.length - 1].push(point);
    	needsRepaint = true;

    	if (hue !== 360) {
	  		hue++;
	  	} else hue = 0;
	  	if (event.shiftKey) {
	  		if (radius !== 5){
	  			radius--;
	  		} else {
	  			radius = 100;
	  		}
	  	} else {
	  		if (radius !== 100) {
	  			radius++;
	  		} else {
	  			radius = 5;
	  		}
	  	}
  	}
})

function setSizes(event) {	
	draw.width = document.documentElement.clientWidth;
	draw.height = document.documentElement.clientHeight;
	curves = [];
}

function pushPoint(x, y, hue, r) {
	return [x, y, hue, r];
}

function addCurve(points) {
  ctx.beginPath(); 
  ctx.lineWidth = points[0][3];
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';  	  

  ctx.moveTo(points[0][0],points[0][1]);

  for(let i = 1; i < points.length - 1; i++) {
  	ctx.lineWidth = points[i][3];  	
    smoothCurveBetween([points[i][0],points[i][1]],
    					[points[i + 1][0],points[i + 1][1]]);  
  }  
  ctx.stroke();  
}

function circle(point) {	
  	ctx.beginPath();  		
  	ctx.arc(point[0], point[1], point[3]/2, 0, 2 * Math.PI);
  	ctx.fill();
  	ctx.stroke();
  	ctx.fillStyle = `hsl(${point[2]},100%,50%)`;
  	ctx.strokeStyle = `hsl(${point[2]},100%,50%)`;
  	ctx.closePath();  	
}

function smoothCurveBetween(point1, point2) {
	const control = point1.map((coord, idx) => (coord + point2[idx]) / 2);
	ctx.quadraticCurveTo(...point1, ...control);	
}

function repaint () {
  	ctx.clearRect(0, 0, draw.width, draw.height);

  	curves
    	.forEach((curve) => {
      	circle(curve[0]);
      	addCurve(curve);      	
    });
}

function tick () {
  if(needsRepaint) {
    repaint();
    needsRepaint = false;
  }

  window.requestAnimationFrame(tick);
}

tick();