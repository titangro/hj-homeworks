'use strict';
const imagePlace = document.getElementById('slider'),
images = ['airmax-jump.png','airmax-on-foot.png','airmax-playground.png','airmax-top-view.png','airmax.png'];
let imageIndex = 0;
setInterval(() => {	
	if (imageIndex < images.length - 1) {
		imageIndex++;
	} else {
		imageIndex = 0;
	}	
	imagePlace.src = './i/' + images[imageIndex];
}, 5000);