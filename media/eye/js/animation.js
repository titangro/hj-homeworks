'use strict';

let counter = 5;
 function tick() {
   console.log(counter);
   counter--;
   if (counter !== 0) {
     return true;
   }
}
requestAnimationFrame(tick);