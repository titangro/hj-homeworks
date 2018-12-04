'use strict';

const drawSocket = new WebSocket('wss://neto-api.herokuapp.com/draw');

drawSocket.addEventListener('open', event => {
	editor.addEventListener('update', updateDraw);
});

drawSocket.addEventListener('close', event => {
	editor.removeEventListener('update', updateDraw);
});

drawSocket.addEventListener('error', error => {
	console.log(error)
});

function updateDraw({ canvas }) {
	canvas.toBlob(function(blob) {		
	  	drawSocket.send(blob);
	});
}

   