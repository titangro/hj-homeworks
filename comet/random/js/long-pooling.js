'use strict'; 

setInterval(()=>{
  fetch('https://neto-api.herokuapp.com/comet/long-pooling')
    .then((res)=> res.json())
    .then((num) => {flipItLP(num, 'long-pooling div')});
},5000);

function flipItLP(num, node) {
  const numbers = document.querySelectorAll(`.${node}`)
  Array.from(numbers).forEach(item => {
  	item.classList.remove('flip-it');
    if(item.textContent == num) {
      item.classList.add('flip-it');
    }
  })
}

