document.addEventListener('DOMContentLoaded', (event) => {
    const cards = document.querySelectorAll('.card');
    const columns = document.querySelectorAll('.column');

    cards.forEach(card => {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('drop', drop);
    });
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('hide');
    }, 0);
}

function dragEnd(event) {
    event.target.classList.remove('hide');
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    if (event.target.classList.contains('column')) {
        event.target.appendChild(card);
    } else {
        event.target.closest('.column').appendChild(card);
    }
}

function addCard(columnId) {
    const column = document.getElementById(columnId);
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.draggable = true;
    newCard.id = 'card-' + new Date().getTime();

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    cardContent.contentEditable = true;
    cardContent.textContent = 'NOME DO CLIENTE';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = () => deleteCard(newCard.id);

    newCard.appendChild(cardContent);
    newCard.appendChild(deleteBtn);

    newCard.addEventListener('dragstart', dragStart);
    newCard.addEventListener('dragend', dragEnd);

    const addButton = column.querySelector('button');
    column.insertBefore(newCard, addButton.nextSibling);
}

function deleteCard(cardId) {
    const card = document.getElementById(cardId);
    card.remove();
}
