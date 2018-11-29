'use strict';

function createElement(node) {
	if (node === undefined || node === null || node === null) {
		return createTextNode('');
	}
	if (typeof node === 'string' || typeof node === 'number' || typeof block === true) {				
		return Array.from(node.split('<br>')).reduce((frm, node) => {			
			if (node === '') {
				frm.appendChild(document.createElement('br'));
			} else {
				frm.appendChild(document.createTextNode(node));
				frm.appendChild(document.createElement('br'));
			}
			return frm;
		}, document.createDocumentFragment());
		
	}
	if (Array.isArray(node)) {
		return node.reduce((frm, elem) => {
			frm.appendChild(createElement(elem));
			return frm;
		}, document.createDocumentFragment());
	}
	const element = document.createElement(node.name || 'div');

    if (node.props) {
        Object.keys(node.props).forEach(key => {
           	element.setAttribute(key, node.props[key]);
        });
    }
    
    if (node.childs) {
        element.appendChild(createElement(node.childs));
    }

    return element;
}
