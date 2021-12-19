/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import enter from './images/enter.png';
import search from './images/searching.png';
import drag from './images/drag-drop.png';
import unCheck from './images/unCheck.png';
import checked from './images/checked.png';
import trash from './images/trash.png';
import {
  itemsArr, tasksListShow, getItems, saveLocalStorage,
} from './activeList.js';
import {
  reload, removeAll, removeItem, updateItem,
} from './AddRemove.js';

const items = [];

const parentNode = document.querySelector('.parent-node');

const tasks = (eachtask) => {
  const showList = document.createElement('div');
  const inputchk = document.createElement('input');
  const taskName = document.createElement('p');
  const dragImg = document.createElement('img');
  inputchk.type = 'checkbox';
  showList.classList = 'show-list';
  inputchk.classList = 'check-box';
  taskName.classList = 'tast';
  dragImg.classList = 'drag-drop';
  taskName.textContent = eachtask.description;
  dragImg.src = '../images/drag-drop.png';
  showList.appendChild(inputchk);
  showList.appendChild(taskName);
  showList.appendChild(dragImg);
  parentNode.appendChild(showList);
};

items.forEach((e) => {
  tasks(e);
});
