/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import enter from './images/enter.png';
import search from './images/searching.png';
import drag from './images/drag-drop.png';
import {
  itemsArr, tasksListShow, getItems, saveLocalStorage,
} from './activeList.js';

const items = [
  {
    description: 'Wake up at 6:00am, Take a BreakFast',
    completed: false,
    index: 1,
  },
  {
    description: 'Go to work at 8:00am',
    completed: false,
    index: 3,
  },
  {
    description: 'Take a lunch with your self.',
    completed: false,
    index: 2,
  },
  {
    description: 'Goto Bed At 9:30 pm',
    completed: false,
    index: 4,
  },
];

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
