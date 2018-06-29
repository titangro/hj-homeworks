'use strict';
const image = document.getElementById('slider');
setInterval(function() {
	let currentImg = image.src.slice(image.src.search(/\/i\//g));
	if (currentImg === '/i/airmax-jump.png') {
		image.src = './i/airmax-on-foot.png';
	} else if (currentImg === '/i/airmax-on-foot.png') {
		image.src = './i/airmax-playground.png';
	} else if (currentImg === '/i/airmax-playground.png') {
		image.src = './i/airmax-top-view.png';
	} else if (currentImg === '/i/airmax-top-view.png') {
		image.src = './i/airmax.png';
	} else {
		image.src = './i/airmax-jump.png';
	}
}, 5000);