// Declare your DOM elements and variables
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const clearBtn = document.getElementById('clear');
const filterItems = document.getElementById('filter');
const itemList = document.getElementById('item-list');
const formBtn = document.querySelector('button');
let isEditMode = false;

// Function Definitions
function displayItems() {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(i => addItemToDom(i));
  resetUI();
}

function addItemSubmit(e) {
  e.preventDefault();
  let newItem = itemInput.value;
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  if (checkIfItemExist(newItem)) {
    let item = itemList.querySelector('.edit-mode');
    alert('The item already exists');
    item.classList.remove('edit-mode');
    resetUI();
    return;
  }
  if (isEditMode) {
    let item = itemList.querySelector('.edit-mode');
    item.remove();
    removeItemsFromStorage(item.textContent);
    isEditMode = false;
  }
  addItemToDom(newItem);
  addItemsToStorage(newItem);
  resetUI();
  itemInput.value = '';
}

function addItemToDom(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// LocalStorage Functions
function addItemsToStorage(item) {
  let itemsFromStorage = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  return localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
}

function removeItemsFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter(i => i !== item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function onClickItems(e) {
  if (e.target.parentNode.classList.contains('remove-item')) { 
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.tagName === 'LI') {
    setItemToEdit(e.target);
  }
}

function removeItem(item) {
  item.remove();
  removeItemsFromStorage(item.textContent);
  resetUI();
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  localStorage.removeItem('items');
  resetUI();
}

function itemFilter(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();
    item.style.display = itemName.indexOf(text) !== -1 ? 'flex' : 'none';
  });
}

function checkIfItemExist(item) {
  return getItemsFromStorage().includes(item);
}

function resetUI() {
  itemInput.value = '';
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    filterItems.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filterItems.style.display = 'block';
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = 'black';
  isEditMode = false;
}

// Export functions and variables
export {
  addItemSubmit,
  onClickItems,
  clearItems,
  displayItems,
  itemFilter,
};
