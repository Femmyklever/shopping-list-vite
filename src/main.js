import './style.css';
import {
  addItemSubmit,
  onClickItems,
  clearItems,
  displayItems,
  itemFilter,
} from './counter.js';

// Attach event listeners
document.getElementById('item-form').addEventListener('submit', addItemSubmit);
document.getElementById('item-list').addEventListener('click', onClickItems);
document.getElementById('clear').addEventListener('click', clearItems);
document.getElementById('filter').addEventListener('input', itemFilter);

// Initialize UI and display items
document.addEventListener('DOMContentLoaded', displayItems);
