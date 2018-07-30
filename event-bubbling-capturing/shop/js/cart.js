'use strict';

document.querySelector('.items-list').addEventListener('click', event => {
	event.preventDefault();
	if (event.target.classList.contains('add-to-cart')) {
		addToCart({
				title: event.target.dataset.title,
			 	price: event.target.dataset.price
			});
	}
})
