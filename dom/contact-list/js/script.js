'use strict';
let contactsPole = document.querySelector('.contacts-list');
const newContact = document.querySelector('.contacts-list li');
contactsPole.innerHTML = "";
const constactsList = JSON.parse(loadContacts());
for (let contact of constactsList) {	
	newContact.dataset.email = contact.email;
	newContact.dataset.phone = contact.phone;
	newContact.innerHTML = "<strong>" + contact.name + "</strong>";	
	contactsPole.innerHTML += newContact.outerHTML;
}
