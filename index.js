// selection of the elements required for the actions

const alertMessage = document.querySelector('.alert-msg');
const toDo = document.querySelector('.todo-app');
const input = document.getElementById('grocery');
const submit = document.querySelector('.btn-submit');
const listContainer = document.querySelector('.list-container');
const list = document.querySelector('.list');
const clear = document.querySelector('.clear-items');

//  edit option
let editElement;
let editFlag = false;
let editID = '';
// console.log(alertMessage, input, toDo, submit, listContainer, list, clear);
// end of selection of elements
// functions which are passed as reference to the event listener as callback functions
// const addItem = (event) => {}; arrow functions are not hoisted
// Event Listeners
// first for form submit which is toDo in our case:
toDo.addEventListener('submit', addItem);
clear.addEventListener('click', clearItem);
window.addEventListener('DOMContentLoaded', setUpItems);

// const deleteButton = document.querySelector('.delete');

function addItem(e) {
  e.preventDefault();
  const inputValue = grocery.value;
  //   console.log(grocery.value);

  const id = new Date().getTime().toString();
  if (inputValue && !editFlag) {
    console.log('add to the list');
    createListItems(id, inputValue);
    alertDisplay('item added to list', 'success');
    //addToLocalStorage
    addToLocalStorage(id, inputValue);
    setBackToDefault();
  } else if (inputValue && editFlag) {
    editElement.innerHTML = inputValue;
    alertDisplay('value Changed', 'success');

    // console.log('edit');
    editLocalStorage(editID, inputValue);

    setBackToDefault();
  } else {
    // console.log('empty value');
    alertDisplay('Please enter some  value', 'danger');
  }
}

function clearItem() {
  const items = document.querySelectorAll('.list-items');

  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  listContainer.classList.remove('show-container');
  alertDisplay('empty list', 'danger');
  setBackToDefault();
  localStorage.removeItem('list');
}

// delete function
function deleteItem(e) {
  //   console.log('deleted');
  const element = e.currentTarget.parentElement.parentElement;
  console.log(e.currentTarget);
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    listContainer.classList.remove('show-container');
  }
  alertDisplay('Items removed', 'danger');
  setBackToDefault();

  // removing from local storage

  removeFromLocalStorage(id);
}

// edit function
function editItem(e) {
  // console.log('edit Item');
  const element = e.currentTarget.parentElement.parentElement;

  // console.log(e.currentTarget);
  // console.log(element);
  // editElement = e.currentTarget.parentElement.previousSiblingElement;//The difference between this property and previousSibling, is that previousSibling returns the previous sibling node as an element node, a text node or a comment node, while previousElementSibling returns the previous sibling node as an element node (ignores text and comment nodes).

  editElement = e.currentTarget.parentElement.previousElementSibling;
  input.value = editElement.innerHTML;

  editFlag = 'true';
  editID = element.dataset.id;
  submit.textContent = 'edit';
  // console.log(editElement);
}
// Alert display function
function alertDisplay(text, action) {
  alertMessage.textContent = text;
  alertMessage.classList.add(`alert-${action}`);

  // to remove alet message
  setTimeout(() => {
    alertMessage.textContent = '';
    alertMessage.classList.remove(`alert-${action}`);
  }, 1000);
}

// setting back to Default

function setBackToDefault() {
  //   console.log('set back to default');
  grocery.value = '';
  editFlag = false;
  editID = '';
  submit.textContent = 'submit';
}

//localStorage
function addToLocalStorage(id, inputValue) {
  console.log('added to addToLocalStorage');
  const input = { id, inputValue };
  console.log(input);
  let items = getLocalStorage();
  // console.log(items);
  items.push(input);
  localStorage.setItem('list', JSON.stringify(items));
  console.log(items);
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.inputValue = value;
    }
    return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [];
}

function setUpItems(id, value) {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItems(item.id, item.inputValue);
    });
    listContainer.classList.add('show-container');
  }
}

function createListItems(id, inputValue) {
  const tobeAddedElement = document.createElement('article');
  tobeAddedElement.classList.add('list-items'); // adding the class to the article

  // adding id
  const attr = document.createAttribute('data-id');
  attr.value = id;
  tobeAddedElement.setAttributeNode(attr);
  tobeAddedElement.innerHTML = ` <span class="title">${inputValue}</span>
    <div class="btn-container">
      <button type="button" class="edit">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button type="button" class="delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>`;

  // adding to the list by appending child

  list.appendChild(tobeAddedElement);

  listContainer.classList.add('show-container');

  //showing container of list

  const deleteButton = tobeAddedElement.querySelector('.delete');
  const editButton = tobeAddedElement.querySelector('.edit');

  deleteButton.addEventListener('click', deleteItem);
  editButton.addEventListener('click', editItem);
}
// localStorage.setItem('orange', JSON.stringify(['item', 'item1']));
// let oranges = JSON.parse(localStorage.getItem('orange'));
// localStorage.removeItem('orange');

// console.log(oranges);
