// Tutaj dodacie zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
let $list, $modal, $buttonForm, $buttonCancel, $buttonOk, $addedInput, $form, $addTodoBtn, $myInput, lastId = 0, $popupInput, $buttonEdit;
const initialList = ['Dzisiaj robię usuwanie', 'Nakarm psa'];

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  prepareInitialList();
}

function prepareDOMElements() {
  // To będzie idealne miejsce do pobrania naszych elementów z drzewa DOM i zapisanie ich w zmiennych
  $list = document.getElementById('list');
  $modal = document.querySelector('#modal');
  $buttonForm = document.querySelector('#addTodo');
  $buttonCancel = document.querySelector('#btn__cancel');
  $buttonOk = document.querySelector('#btn__done');
  $addedInput = document.querySelector('#popupInput');
  $form = document.querySelector('form');
  $addTodoBtn = document.getElementById('addTodo');
  $myInput = document.getElementById('myInput');
  $popupInput = document.getElementById('popupInput');
  $modal = document.querySelector('#myModal');
  $editButton = document.querySelector('#btn_edit');
}

function prepareDOMEvents() {
  $list.addEventListener('click', listClickManager);
  $addTodoBtn.addEventListener('click', addNewTodoToList);

  $buttonForm.addEventListener('click', function () {
    //$modal.classList.toggle('modal--show');
  });
  
  $buttonCancel.addEventListener('click', function () {
    $modal.classList.remove('modal--show');
  });
 
  $form.addEventListener('submit', function(e) {
  e.preventDefault();
  if($addedInput.value.trim() !== '') {
  $list.querySelector('li').innerHTML = $addedInput.value;
  $modal.classList.remove('modal--show');
  } else {
    $addedInput.style.color = 'red';
  }
 });


}


function prepareInitialList() {
  // Tutaj utworzymy sobie początkowe todosy. Mogą pochodzić np. z tablicy
  initialList.forEach(todo => {
    addNewElementToList(todo);
  });
}

function addNewElementToList(title   /* Title, author, id */) {
  //obsługa dodawanie elementów do listy
  // $list.appendChild(createElement('nowy', 2))
  const newElement = createElement(title);
  $list.appendChild(newElement);
  
}

function createElement(title /* Title, author, id */) {
  // Tworzyc reprezentacje DOM elementu return newElement
  // return newElement
  const newElement = document.createElement('li');
  lastId += 1;
  newElement.id = 'todo-' + lastId;

  const titleElement = document.createElement('span');//w jednym divie buttony
  titleElement.innerText = title;

  const delButton = document.createElement('button');
  delButton.innerText = 'delete';
  delButton.className = 'btn-delete';

  newElement.appendChild(titleElement);
  newElement.appendChild(delButton);

  const editButton = document.createElement('button');
  editButton.innerText = 'edit';
  editButton.className = 'btn-edit';

  newElement.appendChild(titleElement);
  newElement.appendChild(editButton);


  const doneButton = document.createElement('button');
  doneButton.innerText = 'done';
  doneButton.className = 'btn-done';

  newElement.appendChild(titleElement);
  newElement.appendChild(doneButton);

  return newElement;

}

function addNewTodoToList() {
  if ($myInput.value.trim()){
    addNewElementToList($myInput.value);
    $myInput.value = '';
  }
}

function listClickManager(event) {
  // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
  // event.target.parentElement.id
  let id = event.target.parentElement.id;

  if (event.target.className === 'btn-delete') { 
    removeListElement(id);
  } else if (event.target.className === 'btn-edit') {
    let title = document.querySelector('#' + id).querySelector('span').innerText;
    editListElement(id, title);
  } else if (event.target.className === 'btn-done') { //można else if ostatnie pominąć
  }

  if(event.target.className === 'btn-edit') {
      $modal.classList.toggle('modal--show');  
  }
}

function removeListElement(id) {
  let liElement = document.querySelector('#' + id);
  $list.removeChild(liElement);
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
  // pobierz dane na temat zadania z popupu (id, nowyTitle, nowyColor ...)
  // Następnie zmodyfikuj element listy wrzucając w niego nowyTitle, nowyColor...
  // closePopup()
}

function openPopup() {
  // Otwórz popup
}

function closePopup() {
  // Zamknij popup
}

function declineChanges() { //niepotrzebna raczej
  // closePopup()
}

function markElementAsDone(/* id */) {
  //zaznacz element jako wykonany (podmień klasę CSS)
}

document.addEventListener('DOMContentLoaded', main);
