'use strict'

const form = document.querySelector('.form-inline');
const btnSeatMap = document.querySelector('.btnSeatMap');
const btnSetFull = document.querySelector('.btnSetFull');
const btnSetEmpty = document.querySelector('.btnSetEmpty');
const seatMapTitle = document.querySelector('.seatMapTitle');

document.addEventListener('DOMContentLoaded', requestLocation)

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
		.then((res) => console.log(res))
}