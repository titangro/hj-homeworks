'use strict';

function showComments(list) {	
  document.querySelector('.comments').appendChild(
  	browserJSEngine(list.map(commentsJStpl))
  );
  /*const comments = list.map(createComment).join('');
  commentsContainer.innerHTML += comments;*/
}

function commentsJStpl(comment) {
	return {
		tag: 'div',
		class: 'comment-wrap',
		content: [{
			tag: 'div',
			class: 'photo',
			attrs: {
				title: comment.author.name
			},
			content: {
				tag: 'div',
				class: 'avatar',
				attrs: {
					style: `background-image: url('${comment.author.pic}')`,
				}
			}
		},
		{
			tag: 'div',
			class: 'comment-block',				
			content: [{
				tag: 'p',
				class: 'comment-text',				
				content: comment.text.split('\n').join('<br>')
			},
			{
				tag: 'div',
				class: 'bottom-comment',
				content: [{
					tag: 'div',
					class: 'comment-date',
					content: new Date(comment.date).toLocaleString('ru-Ru')
				},
				{
					tag: 'ul',
					class: 'comment-actions',
					content: [{
						tag: 'li',
						class: 'complain',
						content: 'Пожаловаться'
					},
					{
						tag: 'li',
						class: 'reply',
						content: 'Ответить'
					}]
				}]
			}]
		}]
	}
}

function browserJSEngine(block) {
	if (block === undefined || block === null || block === null) {
		return createTextNode('');
	}
	if (typeof block === 'string' || typeof block === 'number' || typeof block === true) {				
		return Array.from(block.split('<br>')).reduce((frm, node) => {			
			if (node === '') {
				frm.appendChild(document.createElement('br'));
			} else {
				frm.appendChild(document.createTextNode(node));
				frm.appendChild(document.createElement('br'));
			}
			return frm;
		}, document.createDocumentFragment());
		
	}
	if (Array.isArray(block)) {
		return block.reduce((frm, elem) => {
			frm.appendChild(browserJSEngine(elem));
			return frm;
		}, document.createDocumentFragment());
	}
	const element = document.createElement(block.tag || 'div');
        element.classList.add(...[].concat(block.class).filter(Boolean));
        if (block.attrs) {
            Object.keys(block.attrs).forEach(key => {
                element.setAttribute(key, block.attrs[key]);
            });
        }
        if (block.content) {
            element.appendChild(browserJSEngine(block.content));
        }

        return element;
}
 
/*function createComment(comment) {
  return 
  `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`
}*/

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
