'use strict';

const textare = document.querySelector('textarea'),
	block = document.querySelector('.block'),
	message = document.querySelector('.message');

textare.addEventListener('focus', (event) => {
	block.classList.add('active');	
})

textare.addEventListener('keydown', debounce(showMes, 2000));
textare.addEventListener('keydown', () => {
	message.classList.remove('view');
	block.classList.add('active');
});

textare.addEventListener('blur', (event) => {
	block.classList.remove('active');
	message.classList.remove('view');
});

function showMes() {
	message.classList.add('view');
	block.classList.remove('active');
}

function debounce(callback, delay) {
	let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        callback();
      }, delay);
    }
  }