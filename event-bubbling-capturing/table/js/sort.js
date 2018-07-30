'use strict';

function handleTableClick(event) {
  if (event.target.nodeName === 'TH') {
  	if (event.target.dataset.dir != 1) {
  		event.target.dataset.dir = 1;
  	} else {
  		event.target.dataset.dir = -1;
  	}
  	const tableSort = document.querySelector('table');
  	tableSort.dataset.sortBy = event.target.dataset.propName;
  	sortTable(tableSort.dataset.sortBy, event.target.dataset.dir);
  }
}
