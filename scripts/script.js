// Tutaj dodacie zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
let $list, $modal, $buttonForm, $buttonCancel, $buttonOk, $addedInput, $form;
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
  $buttonForm = document.querySelector('addTodo');
  $buttonCancel = document.querySelector('btn__cancel');
  $buttonOk = document.querySelector('btn__done');
  $addedInput = document.querySelector('popupInput');
  $form = document.querySelector('form');
}

function prepareDOMEvents() {
  $buttonForm.addEventListener('click', function () {
    $modal.classList.toggle('modal--show');
  });
  $buttonCancel.addEventListener('click', function () {
    $modal.classList.remove('modal--show');
  });
 
  //$addedInput.addEventListener('keyup', function (e) {
    //if (e.keyCode === 13) {
      //$list.querySelector('li').innerHTML = $addedInput.value;
      //$modal.classList.remove('modal--show');
    //}
  //});
 $form.addEventListener('submit', function(e) {
  e.preventDefault();
  if($addedInput.value.trim() !== '') {
  $list.querySelector('li').innerHTML = $addedInput.value;
  $modal.classList.remove('modal--show');
 });
}

function prepareDOMEvents() {
  // Przygotowanie listenerów
  $list.addEventListener('click', listClickManager);
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
  newElement.innerText = title;

  return newElement;
}

function listClickManager(/* event- event.target */) {
  // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
  // event.target.parentElement.id
  // if (event.target.className === 'edit') { editListElement(id) }
}

function removeListElement(/* id */) {
  // Usuwanie elementu z listy
}

function editListElement(/* id */) {
  // Pobranie informacji na temat zadania
  // Umieść dane w popupie
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
