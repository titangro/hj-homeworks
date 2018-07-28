'use strict';
const tabsContent = document.querySelector('.tabs-content');
const tabsNav = document.querySelector('.tabs-nav');
const tab = tabsNav.firstElementChild.cloneNode(true);
Array.from(tabsNav.children).forEach(item => {tabsNav.removeChild(item);});
Array.from(tabsContent.children).forEach(item => {
	let clone;
	if (tabsNav.lastElementChild) {
		clone = tabsNav.lastElementChild.cloneNode(true);
	} else {
		clone = tab;
	}	
	clone.firstElementChild.textContent = item.dataset.tabTitle;	
	clone.firstElementChild.classList.remove(clone.firstElementChild.classList[1]);
	clone.firstElementChild.classList.add(item.dataset.tabIcon);
	tabsNav.appendChild(clone);	
});
tabsNav.children[0].classList.add('ui-tabs-active');
checkArticle();
Array.from(tabsNav.children).forEach(item => {
	item.addEventListener('click', turnTab);
});
function turnTab(event) {
	if (event.currentTarget.classList.contains('ui-tabs-active')) return;
	for (let child of event.currentTarget.parentElement.children) {
		child.classList.remove('ui-tabs-active');
	}
	event.currentTarget.classList.add('ui-tabs-active');
	checkArticle();
}
function checkArticle() {
	for (let i = 0; i < tabsNav.children.length; i++) {
		if (tabsNav.children[i].classList.contains('ui-tabs-active')) {
			tabsContent.children[i].classList.remove('hidden');
		} else {
			tabsContent.children[i].classList.add('hidden');
		}
	}	
}
