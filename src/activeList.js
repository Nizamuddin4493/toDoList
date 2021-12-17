/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-const-assign */
const form = document.querySelector('#form');
const inputF = document.querySelector('.inputF');
const parentNode = document.querySelector('.parent-node');
const enterErr = document.querySelector('.enter-err');
const enterBtn = document.querySelector('.btn');

let itemsArr = [];

const tasksListShow = (itemsArr) => {
  parentNode.innerHTML = '';
  if (itemsArr.length > 0) {
    itemsArr.forEach((item) => {
      parentNode.insertAdjacentHTML('beforeend',
        `<div class="show-list">
      <input type="checkbox" class="check-box">
      <p class="tast">${item.description}</p>
      <img src="images/drag-drop.png" alt="" class="drag-drop">
      </div>`);
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
      const itemObj = {
        description: inputVal,
        completed: false,
      };
      itemsArr.push(itemObj);
      saveLocalStorage(itemsArr);
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
  itemsArr, tasksListShow, getItems, saveLocalStorage,
};
