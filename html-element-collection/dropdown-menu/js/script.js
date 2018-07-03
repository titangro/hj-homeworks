'use strict';
const dropdown = document.getElementsByClassName('wrapper-dropdown')[0];
function dropdownMenu() {	
	this.classList.toggle('active');
}
dropdown.onclick = dropdownMenu;