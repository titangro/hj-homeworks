'use strict';
const images = ['breuer-building.jpg','guggenheim-museum.jpg','headquarters.jpg','IAC.jpg','new-museum.jpg'];
let i = 0;
function changeImage() {
	const currentImage = document.getElementById('currentPhoto');
	const currentImageName = currentImage.src.slice(currentImage.src.search(/\/i\//g)+3);	
	if (this.id === 'prevPhoto') {			
		if (i > 0) {
			i--;
		} else {
			i = images.length - 1;			
		}
	} else {		
		if (i < images.length - 1) {
			i++;			
		} else {
			i = 0;
		}
	}
	currentImage.src = './i/' + images[i];
}
for (const btnId of ['prevPhoto', 'nextPhoto']) {
	const btn = document.getElementById(btnId);
	btn.onclick = changeImage;
}