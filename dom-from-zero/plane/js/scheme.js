'use strict'

const form = document.querySelector('.form-inline');
let scheme = '';
const acSelect = document.querySelector('#acSelect');

const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
const btnSetEmpty = document.querySelector('#btnSetEmpty');

const seatMapTitle = document.querySelector('#seatMapTitle');
const seatMapDiv = document.querySelector('#seatMapDiv');

const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult');
const totalHalf = document.querySelector('#totalHalf');

document.addEventListener('DOMContentLoaded', requestLocation);
btnSeatMap.addEventListener('click', showScheme);
btnSetFull.addEventListener('click', showScheme);
btnSetEmpty.addEventListener('click', showScheme);
acSelect.addEventListener('change', requestLocation);
seatMapDiv.addEventListener('click', changeSeat)

checkScheme();

function showScheme(event) {
	event.preventDefault();
	let adult = '';
	let i = 1;
	let result = '';
	if (event.target.id === 'btnSetFull') {
		adult = 'adult';
	} else if (event.target.id === 'btnSetEmpty') {
		adult = '';
	}
	result = scheme.scheme.reduce((frm, elem) => {
		if (elem === 0) {
			frm.appendChild(
				createSchemeEngine(
					createRowScheme('', i)));
		} else if (elem === 4) {			
			frm.appendChild(
				createSchemeEngine(
					createRowScheme(scheme.letters4, i, adult)));
		} else {
			frm.appendChild(
				createSchemeEngine(
					createRowScheme(scheme.letters6, i, adult)));
		}
		i++;
		return frm;
	}, document.createDocumentFragment());
	clearElem(seatMapDiv);
	clearElem(seatMapTitle);
	seatMapDiv.appendChild(result);
	seatMapTitle.appendChild(
		document.createTextNode(
			`${scheme.title} (${scheme.passengers} пассажиров)`
		)
	);
	seatMapDiv.classList.add('active');
	checkScheme();
	showTotal();
}

function changeSeat(event) {
	if (event.target.classList.contains('seat-label')) {
		let seat = event.target.parentElement;
		if (event.altKey) {
			if (seat.classList.contains('half')) {
				seat.classList.remove('half');
			} else {
				seat.classList.remove('adult');
				seat.classList.add('half');
			}
		} else {
			if (seat.classList.contains('adult') || seat.classList.contains('half')) {
				seat.classList.remove('adult');
				seat.classList.remove('half');
			} else {
				seat.classList.add('adult');
			}
		}
		showTotal();
	}
}

function showTotal() {
	totalPax.textContent = document.querySelectorAll('.seat').length;
	totalAdult.textContent = document.querySelectorAll('.adult').length;
	totalHalf.textContent = document.querySelectorAll('.half').length;
}

function clearElem(block) {
	while (block.lastChild) {
		block.removeChild(block.lastChild);
	}
}

function showId() {
	const formData = new FormData(form);
	for (const [k, v] of formData) {
		return v;
	}
}

function requestLocation() {
	fetch(`https://neto-api.herokuapp.com/plane/${showId()}`)
		.then((res) => { 
			return res.json();
		})
		.then((res) => {
			scheme = res;
		})
}

function checkScheme() {
	if (!seatMapDiv.classList.contains('active')) {
		btnSetFull.setAttribute('disabled','');
		btnSetEmpty.setAttribute('disabled','');
	} else {
		btnSetFull.removeAttribute('disabled');
		btnSetEmpty.removeAttribute('disabled')
	}
}

function createRowScheme(letters, num, adult) {
	const letters1half = letters.slice(0, letters.length / 2),
		letters2half = letters.slice(letters.length / 2);

	const half1 = letters !== '' ? letters1half.reduce((array, letter) => {
		array.push(createSeatScheme(letter, adult));
		return array;
	}, []) : createNoSeatScheme();


	const half2 = letters !== '' ? letters2half.reduce((array, letter) => {
		array.push(createSeatScheme(letter, adult));
		return array;
	}, []) : createNoSeatScheme();

	return {
		name: 'div',
		props: { class: ['row', 'seating-row', 'text-center'] },
		childs: [{
			name: 'div',
			props: { class: ['col-xs-1', 'row-number'] },
			childs: {
				name: 'h2',
				props: { class: '' },
				childs: num,
			}
		},{
			name: 'div',
			props: { class: 'col-xs-5' },
			childs: half1,
		},{
			name: 'div',
			props: { class: 'col-xs-5' },
			childs: half2,						
		}]
	}
}

function createSeatScheme(letter, adult = '') {
	return {
		name: 'div',
		props: {
			class: ['col-xs-4', 'seat', adult],
		},
		childs: {
			name: 'span',
			props: {
				class: 'seat-label',
			},
			childs: letter,
		}
	}
}

function createNoSeatScheme() {
	return {
		name: 'div',
		props: {
			class: ['col-xs-4', 'no-seat']
		},
		childs: '',
	}
}

function createSchemeEngine(node) {
	if (node === undefined || node === null || node === null) {
		return createTextNode('');
	}
	if (typeof node === 'string' || typeof node === 'number' || typeof block === true) {				
		return document.createTextNode(node);		
	}
	if (Array.isArray(node)) {
		return node.reduce((frm, elem) => {
			frm.appendChild(createSchemeEngine(elem));
			return frm;
		}, document.createDocumentFragment());
	}
	const element = document.createElement(node.name || 'div');

    if (node.props) {
        Object.keys(node.props).forEach(key => {
        	if (Array.isArray(node.props[key])) {
        		node.props[key].forEach(cls => {
        			if (cls) {      			
        				element.classList.add(cls);
        			}
        		})        		
        	} else {
        		element.setAttribute(key, node.props[key]);
        	}        	
        });
    }
    
    if (node.childs) {
        element.appendChild(createSchemeEngine(node.childs));
    }

    return element;
}