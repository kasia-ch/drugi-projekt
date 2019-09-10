let $list, $modal, $buttonCancel, $buttonOk, $form, $myInput, lastId = 0, $popupInput, $editButton, currentId, $doneButton, $closePopup;
const initialList = ['Dzisiaj robię usuwanie', 'Nakarm psa'];

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  getListFromServer();
}

function getListFromServer () {
  $list.innerHTML = '';
  axios.get('http://195.181.210.249:3000/todo/')
    .then(function (response) {
      if (response.status === 200) {
        response.data.forEach(todo => {
          addNewElementToList(todo.title, todo.id);
        });
      }
    });
}

function prepareDOMElements() {
  $list = document.getElementById('list');
  $modal = document.querySelector('#modal');
  $buttonCancel = document.querySelector('#btn__cancel');
  $buttonOk = document.querySelector('#btn__done');
  $form = document.querySelector('#addForm');
  $myInput = document.getElementById('myInput');
  $popupInput = document.getElementById('popupInput');
  $modal = document.querySelector('#myModal');
  $editButton = document.querySelector('#btn_edit');
  $doneButton = document.querySelector('#btn_done');
  $closePopup = document.getElementById('closePopup');
}

function prepareDOMEvents() {
  $list.addEventListener('click', listClickManager);

  $buttonCancel.addEventListener('click', function () {
    closePopup();
  });

  $closePopup.addEventListener('click', function () {
    closePopup();
  });

   $buttonOk.addEventListener('click', function () {
    acceptChangeHandler();
  });

  $form.addEventListener('submit', function(e) {
    e.preventDefault(); {
      if ($myInput.value.trim() !=='') {
        sendTodoToServer();
      }
    } 
  });
}


function prepareInitialList() {
  initialList.forEach(todo => {
    addNewElementToList(todo);
  });
}

function addNewElementToList(title, id) {
  const newElement = createElement(title, id);
  $list.appendChild(newElement);
}
// zmiana test

function createElement(title, id) {
  let buttonWrapper = document.createElement('div');

  const newElement = document.createElement('li');
  newElement.setAttribute('data-id', id);
 
  const titleElement = document.createElement('span');
  titleElement.innerText = title;


  const editButton = document.createElement('button');
  editButton.innerText = 'edit';
  editButton.className = 'btn-edit';

  const doneButton = document.createElement('button');
  doneButton.innerText = 'done';
  doneButton.className = 'btn-done';

  const delButton = document.createElement('button');
  delButton.innerText = 'delete';
  delButton.className = 'btn-delete';

  newElement.appendChild(titleElement);
  buttonWrapper.appendChild(editButton);
  buttonWrapper.appendChild(doneButton);
  buttonWrapper.appendChild(delButton);
  newElement.appendChild(buttonWrapper);
  
  return newElement;
}

function addNewTodoToList() {
  addNewElementToList($myInput.value);
  $myInput.value = '';
}

function listClickManager(event) {
  let id = event.target.parentElement.parentElement.dataset.id;
 
  if (event.target.className === 'btn-delete') { 
    removeListElement(id);
  } else if (event.target.className === 'btn-edit') {
    currentId = id;
  
    let title = document.querySelector('li[data-id="' + id + '"]').querySelector('span').innerText;
    editListElement(id, title);
  
  } else if (event.target.className === 'btn-done') {
    event.target.parentElement.parentElement.classList.toggle('done');
 }
}

function removeListElement(id) {
  axios.delete('http://195.181.210.249:3000/todo/' + id).then((response) => {
    if (response.data.status === 0) {
      getListFromServer();
    }
  });
}

function editListElement(id, title) {
  openPopup();
  $popupInput.value = title;
}

function acceptChangeHandler() {
  axios.put('http://195.181.210.249:3000/todo/' + currentId, {
    title: $popupInput.value
  }).then((response) => {
    if (response.data.status === 0) {
      getListFromServer();
      closePopup();
    }
  })
}

function sendTodoToServer() {
axios.post('http://195.181.210.249:3000/todo/', {title: $myInput.value}).then((response) => {
  getListFromServer()
  });
}

function openPopup() {
  $modal.classList.add('modal--show');  
}

function closePopup() {
  $modal.classList.remove('modal--show');
}

document.addEventListener('DOMContentLoaded', main);