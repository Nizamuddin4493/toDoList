/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-mutable-exports */

import _ from 'lodash';

/* eslint-disable no-const-assign */
const form = document.querySelector('#form');
const inputF = document.querySelector('.inputF');
const parentNode = document.querySelector('.parent-node');
const enterErr = document.querySelector('.enter-err');
const edit = document.querySelector('.edit');
const enterBtn = document.querySelector('.btn');
const removeAll = document.querySelector('.removeAll');

let itemsArr = [];

const removeItem = function (item) {
  const removeIndex = itemsArr.indexOf(item);
  itemsArr.splice(removeIndex, 1);
};

const updateItem = function (currentItemIndex, value) {
  const newItem = itemsArr[currentItemIndex];
  newItem.description = value;
  itemsArr.splice(currentItemIndex, 1, newItem);
  // eslint-disable-next-line no-use-before-define
  saveLocalStorage(itemsArr);
};

// eslint-disable-next-line func-names
const handleItem = function (itemData) {
  const items = document.querySelectorAll('.show-list');
  items.forEach((item) => {
    // eslint-disable-next-line eqeqeq
    if (item.querySelector('.tast').getAttribute('data-time') == itemData.index) {
      item.querySelector('[data-done]').addEventListener('change', (e) => {
        e.preventDefault();
        const itemIndex = itemsArr.indexOf(itemData);
        const currentItem = itemsArr[itemIndex];
        // eslint-disable-next-line no-unneeded-ternary
        currentItem.completed = currentItem.completed ? false : true;
        itemsArr.splice(itemIndex, 1, currentItem);
        // eslint-disable-next-line eqeqeq
        if (currentItem.completed == false) {
          item.querySelector('.tast').style.textDecoration = '';
          item.querySelector('.drag-drop').style.display = 'flex';
          item.querySelector('.trash').style.display = 'none';
        } else {
          item.querySelector('.tast').style.textDecoration = 'line-through';
          item.querySelector('.drag-drop').style.display = 'none';
          item.querySelector('.trash').style.display = 'flex';
        }
        // eslint-disable-next-line consistent-return
        removeAll.addEventListener('click', (e) => {
          e.preventDefault();
          // eslint-disable-next-line eqeqeq
          if (currentItem.completed == true) {
            const removeIndex = itemsArr.indexOf(currentItem);
            itemsArr.splice(removeIndex, 1);
          }
          saveLocalStorage(itemsArr);
        });
        saveLocalStorage(itemsArr);
      });
      item.querySelector('[data-edit]').addEventListener('click', (e) => {
        e.preventDefault();
        inputF.value = itemData.description;
        edit.innerHTML = 'Please Edit Your today\'s To-Do Task here';
        document.querySelector('#objIndex').value = itemsArr.indexOf(itemData);
      });
      item.querySelector('[data-delete]').addEventListener('click', (e) => {
        e.preventDefault();
        parentNode.removeChild(item);
        removeItem(item);
        saveLocalStorage(itemsArr);
        // eslint-disable-next-line eqeqeq
        return itemsArr.filter((item) => item != itemData.description);
      });
    }
  });
};

const tasksListShow = (itemsArr) => {
  parentNode.innerHTML = '';
  if (itemsArr.length > 0) {
    itemsArr.forEach((item) => {
      parentNode.insertAdjacentHTML('beforeend',
        `<div class="show-list">
        <input type="checkbox" data-done class="check-box" autocomplete="off">
      <p class="tast" data-edit data-time="${item.index}">${item.description}</p>
      <img src="images/drag-drop.png" alt="" class="drag-drop">
      <img src="images/trash.png" alt="" data-delete class="trash">
      </div>`);
      handleItem(item);
    });
  }
};

const getItems = () => {
  const storeItems = localStorage.getItem('itemsArr');
  if (storeItems === 'undefined' || storeItems == null) {
    itemsArr = [];
  } else {
    itemsArr = JSON.parse(storeItems);
  }
  tasksListShow(itemsArr);
};

const saveLocalStorage = (itemsArr) => {
  localStorage.setItem('itemsArr', JSON.stringify(itemsArr));
};

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputVal = inputF.value.trim();
    if (inputVal.length === 0) {
      enterErr.innerHTML = 'Please Enter Your today\'s To-Do Task';
    } else {
      const currentItemIndex = document.querySelector('#objIndex').value;
      if (currentItemIndex) {
        updateItem(currentItemIndex, inputVal);
        document.querySelector('#objIndex').value = '';
      } else {
        const itemObj = {
          description: inputVal,
          completed: false,
          index: new Date().getTime(),
        };
        itemsArr.push(itemObj);
        saveLocalStorage(itemsArr);
      }
    }
  });
  getItems();
});

// Reload the Page
function reload() {
// eslint-disable-next-line no-func-assign
  reload = location.reload();
}
// Event listeners for reload.
enterBtn.addEventListener('click', reload, false);

/* eslint-disable import/prefer-default-export */

export {
  itemsArr, tasksListShow, getItems, saveLocalStorage, enterBtn,
};
