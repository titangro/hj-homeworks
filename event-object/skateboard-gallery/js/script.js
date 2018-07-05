'use scrict';
const buttons = document.getElementsByTagName('a'),
hrefImgBeginnig = 'https://netology-code.github.io/hj-homeworks/event-object/skateboard-gallery/images/full/';
function changeImg(src) {
	document.getElementsByClassName('gallery-view')[0].src = hrefImgBeginnig + '0' + src; 
}
for (const button of buttons) {
	button.addEventListener('click', (event) => {
		event.preventDefault();
		for (const button of buttons) {
			button.classList.remove('gallery-current');
		}		
		event.currentTarget.classList.add('gallery-current');
		let indexImg = event.currentTarget.href.search(/\/full\//g)
		indexImg = event.currentTarget.href.slice(indexImg+7);
		changeImg(indexImg);
	});
}