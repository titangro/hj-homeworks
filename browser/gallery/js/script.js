'use strict';
const images = ['breuer-building.jpg','guggenheim-museum.jpg','headquarters.jpg','IAC.jpg','new-museum.jpg'],
prevImg = document.getElementById('prevPhoto'),
nextImg = document.getElementById('nextPhoto'),
imagePlace = document.getElementById('currentPhoto');
let indexImg = images.indexOf(imagePlace.src.slice(imagePlace.src.search(/.\/i\//g)+4)); //для случаев, если на странице отображается не первая фотография из списка
function changeImage() {
	imagePlace.src = './i/' + images[indexImg];
}
nextImg.onclick = () => {
	if (indexImg < images.length - 1) {
		indexImg++
	} else {
		indexImg = 0;
	}
	changeImage();
}
prevImg.onclick = () => {
	if (indexImg) {
		indexImg--
	} else {
		indexImg = images.length - 1;
	}
	changeImage();
}