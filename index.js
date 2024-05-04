// selection of the elements required for the actions

const alertMessage = document.querySelector('.alert-msg');
const input = document.getElementById('grocery');
const toDo = document.querySelector('.todo-app');
const submit = document.querySelector('.btn-submit');
const listContainer = document.querySelector('.list-container');
const list = document.querySelector('.list');
const clear = document.querySelector('.clear-items');

//  edit option
let edit;
let editFlag = false;
let editID = '';
// console.log(alertMessage, input, toDo, submit, listContainer, list, clear);
// end of selection of elements
// functions which are passed as reference to the event listener as callback functions
// const addItem = (event) => {}; arrow functions are not hoisted
// Event Listeners
// first for form submit which is toDo in our case:
toDo.addEventListener('submit', addItem);

function addItem(e) {
  e.preventDefault();
  const inputValue = grocery.value;
  //   console.log(grocery.value);

  const id = new Date().getTime().toString();
  if (inputValue && !editFlag) {
    // console.log('add to the list');

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
    alertDisplay('item added to list', 'success');
    listContainer.classList.add('show-container');

    //showing container of list

    //addToLocalStorage
    addToLocalStorage(id, 'value');
    setBackToDefault();
  } else if (inputValue && editFlag) {
    console.log('edit');
  } else {
    // console.log('empty value');
    alertDisplay('Please enter some  value', 'danger');
  }
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
function addToLocalStorage(id, value) {
  console.log('added to addToLocalStorage');
}
