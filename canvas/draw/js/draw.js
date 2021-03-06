'use strict';

const draw = document.querySelector('#draw');
const ctx = draw.getContext('2d');

window.addEventListener('load', setSizes);
window.addEventListener('resize', setSizes);

let points = [];
let drawing = false;
let needsRepaint = false;
let radius = 100;
let hue = 0;

draw.addEventListener('dblclick', event => {
	points = [];
	needsRepaint = true;
	tick();
})
draw.addEventListener('mousedown', event => {
	drawing = true;
	//points.push(pushPoint(event.offsetX, event.offsetY, hue, radius));
  	needsRepaint = true;  	
})
draw.addEventListener('mouseup', event => {drawing = false;})
draw.addEventListener('mouseleave', event => {drawing = false;})
draw.addEventListener('mousemove', event => {
	if (drawing) {
    	const point = pushPoint(event.offsetX, event.offsetY, hue, radius);
    	points.push(point);    	    	
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
	points = [];
}

function pushPoint(x, y, hue, r) {
	return [x, y, hue, r];
}

function circle(point) {
  	ctx.beginPath(); 
  	ctx.fillStyle = `hsl(${point[2]},100%,50%)`; 		
  	ctx.arc(point[0], point[1], point[3]/2, 0, 2 * Math.PI);
  	ctx.fill();
  	ctx.closePath();  	
}

function addCurve(points1, points2) {
	if (points2) {
	  ctx.beginPath(); 
	  ctx.lineWidth = points1[3];
	  ctx.lineJoin = 'round';
	  ctx.lineCap = 'round'; 
	  ctx.strokeStyle = `hsl(${points1[2]},100%,50%)`;  	  

	  ctx.moveTo(points2[0],points2[1]);

	  smoothCurveBetween([points1[0],points1[1]],
	    					[points2[0],points2[1]]);
	  ctx.stroke();  
	}
}

function smoothCurveBetween(point1, point2) {
	ctx.quadraticCurveTo(...point1, ...point2);	
}

function repaint () {
  	ctx.clearRect(0, 0, draw.width, draw.height);
  	let i = 1;
  	points
    	.forEach((point) => {
      	circle(point);       	
      	if (points && points.length > 1) {
      		addCurve(points[i-1], points[i]);
      	}  
      	i++;	    	
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