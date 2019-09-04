// Tutaj dodacie zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
let $list, $modal, $buttonCancel, $buttonOk, $form, $myInput, lastId = 0, $popupInput, $editButton, currentId, $doneButton, $closePopup;
const initialList = ['Dzisiaj robię usuwanie', 'Nakarm psa'];

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  //prepareInitialList();
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
  // To będzie idealne miejsce do pobrania naszych elementów z drzewa DOM i zapisanie ich w zmiennych
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
        //addNewTodoToList();
        sendTodoToServer();
      }
    } 
 });
}


function prepareInitialList() {
  // Tutaj utworzymy sobie początkowe todosy. Mogą pochodzić np. z tablicy
  initialList.forEach(todo => {
    addNewElementToList(todo);
  });
}

function addNewElementToList(title, id) {
  //obsługa dodawanie elementów do listy
  // $list.appendChild(createElement('nowy', 2))
  const newElement = createElement(title, id);
  $list.appendChild(newElement);
  
}

function createElement(title, id) {
  let div1 = document.createElement('div');

  const newElement = document.createElement('li');
  //lastId += 1;
  newElement.setAttribute('data-id', id);
  let div2 = document.createElement('div');
  const titleElement = document.createElement('span');//w jednym divie buttony
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
  newElement.appendChild(editButton);
  newElement.appendChild(doneButton);
  newElement.appendChild(delButton);

  
  return newElement;

}

function addNewTodoToList() {
  addNewElementToList($myInput.value);
  $myInput.value = '';
}


function listClickManager(event) {
  // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
  // event.target.parentElement.id
  let id = event.target.parentElement.dataset.id;
 
  if (event.target.className === 'btn-delete') { 
    let dataID = event.target.parentElement.dataset.id;
    removeListElement(id);
  } else if (event.target.className === 'btn-edit') {
    currentId = id;
  
    let title = document.querySelector('li[data-id="' + id + '"]').querySelector('span').innerText;
    editListElement(id, title);
  
    
  } else if (event.target.className === 'btn-done') {
    event.target.parentElement.classList.toggle('done');
 }

}

function removeListElement(id) {
  //let liElement = document.querySelector('li[data-id="' + id + '"]');
 
  axios.delete('http://195.181.210.249:3000/todo/' + id).then((response) => {
    if (response.data.status === 0) {
      getListFromServer();
    }
  });
 
  //$list.removeChild(liElement);
}

function editListElement(id, title) {
  // Pobranie informacji na temat zadania
  // Umieść dane w popupie
  openPopup();
  $popupInput.value = title;

  //let liElement = document.querySelector('#' + id);
 // $list.editListElement(liElement);
}

function addDataToPopup(/* Title, author, id */) {
  // umieść informacje w odpowiednim miejscu w popupie
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
    
  });
}

function openPopup() {
  // Otwórz popup

    $modal.classList.add('modal--show');  

}

function closePopup() {
  //let id = event.target.parentElement.id;
  $modal.classList.remove('modal--show');
}

function declineChanges() { //niepotrzebna raczej
  // closePopup()
}

function markElementAsDone(/* id */) {
  //zaznacz element jako wykonany (podmień klasę CSS)
}

document.addEventListener('DOMContentLoaded', main);