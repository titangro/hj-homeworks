'use strict';

setInterval(()=>{
  fetch('https://neto-api.herokuapp.com/comet/pooling')
    .then((res)=> res.json())
    .then((num) => {flipItP(num, 'pooling div')})
},5000);

function flipItP(num, node) {
  const numbers = document.querySelectorAll(`.${node}`)
  Array.from(numbers).forEach(item => {
  	item.classList.remove('flip-it');
    if(item.textContent == num) {
      item.classList.add('flip-it');
    }
  })
}