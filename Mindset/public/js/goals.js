import {
  toggleModal
} from "../../utils/helpers.js";

import {
  setToast,
  displayToasts,
  removeToast
} from './toasts.js';


import {
  Goal
} from "./Goal.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let btnsEnabled = false;
let myGoals = JSON.parse(localStorage.getItem('myGoals')) || [];
let ITEMS_PER_PAGE = 3;
let MAX_PAGE = Math.ceil(myGoals.length / ITEMS_PER_PAGE);
let CURRENT_PAGE = urlParams.get('page') || 1;
let START = (CURRENT_PAGE - 1) * ITEMS_PER_PAGE;
let END = CURRENT_PAGE * ITEMS_PER_PAGE;
let displayGoals = myGoals.slice(START, END);


// only used for development purposes
const getInfo = () => {
  let total = myGoals !== null ? myGoals.length : 0;
  let displaying = displayGoals !== null ? displayGoals.length : 0;
  console.log(`Current Page = ${CURRENT_PAGE}
Max Page = ${MAX_PAGE}
Start: ${START} - End: ${END}
Total Goals: ${total}
Goals Displayed: ${displaying}
`);
}


const addGoal = () => {
  const title = document.querySelector('#addTitle');
  const status = document.querySelector('#addStatusComplete');
  const desc = document.querySelector('#addDesc');
  let currentStatus = status.checked === true ? 'Completed' : 'In Progress';
  let modal = desc.parentElement.parentElement.parentElement;
  if (title.value === "" ||
    desc.value === "") {
    let removeId = setToast('Title and description cannot be empty.', 'error');
    removeToast(removeId, 5000);
    // Hide the modal
    modal.classList.toggle('hidden');
    return;
  }

  // Create a goal object
  const goal = new Goal(title.value, currentStatus, desc.value);
  goal.read();
  //Add it to the goals list
  myGoals.push(goal);
  saveGoals();


  // Clear the add goal modal
  title.value = '';
  desc.value = '';

  // Hide the modal
  modal.classList.toggle('hidden');

  // Set a success message
  let removeId = setToast('Goal added successfully!', 'success');
  removeToast(removeId, 3500);
  MAX_PAGE = Math.ceil(myGoals.length / ITEMS_PER_PAGE);
  CURRENT_PAGE = MAX_PAGE;
  getGoals()
};

const populateGoals = (goalsList) => {
  let container = document.querySelector('#goals-container');
  let content = "";
  goalsList.forEach(goal => {
    content += `<div class="goal">
  <h3 class="goalTitle">${goal.title}</h3>
  <p class="goalStatus">Status: ${goal.status}</p>
  <p class="goalDesc">${goal.desc}</p>
  <div class="goal-actions">
  <button data-type="edit" data-id="${goal.id}">Edit</button>
  <button data-type="delete" data-id="${goal.id}">Delete</button>
  </div>
  </div>
  `
  });
  if (goalsList.length <= 0) {
    content += `<div class="toast error">
    <h3>Nothing to show</h3>
    <div>`
  }
  let options = {
    previous: false,
    next: false
  };

  if (myGoals.length >= ITEMS_PER_PAGE) {
    content += `<div class="pagination-actions">`
    if (CURRENT_PAGE > 1) {
      options.previous = true;
      content += ` <button id="paginate-previous">Previous</button>`
    }
    if (CURRENT_PAGE !== MAX_PAGE) {
      options.next = true;
      content += `<button id="paginate-next">Next</button>`
    }
    content += `</div>`
  }
  container.innerHTML = content;
  enablePagination(options);
};

const editGoal = (id) => {
  let goalIndex = findGoal(id);

  const newTitle = document.querySelector('#editTitle');
  const status = document.querySelector('#editStatusComplete');
  const newDesc = document.querySelector('#editDesc');
  let newStatus = status.checked === true ? 'Completed' : 'In Progress';

  myGoals[goalIndex].title = newTitle.value;
  myGoals[goalIndex].status = newStatus;
  if (myGoals[goalIndex].status === "Completed") {
    myGoals[goalIndex].completedAt = new Date();
  } else if (myGoals[goalIndex].status === "In Progress") {
    myGoals[goalIndex].completedAt = undefined;
  }
  myGoals[goalIndex].desc = newDesc.value;
  myGoals[goalIndex].createdAt = new Date(myGoals[goalIndex].createdAt);
  myGoals[goalIndex].lastUpdate = new Date;
  myGoals[goalIndex].read();


  toggleModal('#editGoalModal');
  saveGoals();
  getGoals();

  enableEditBtn();
}

const findGoal = (id) => {
  return myGoals.findIndex(goal => goal.id === id);
}

const getGoals = () => {
  MAX_PAGE = Math.ceil(myGoals.length / ITEMS_PER_PAGE);
  if (CURRENT_PAGE !== 1) {
    if (CURRENT_PAGE > MAX_PAGE) {
      let attempted = CURRENT_PAGE;
      CURRENT_PAGE = MAX_PAGE;
      let position = myGoals.length > 3 ? 'last' : 'first';
      let removeId = setToast(`Page ${attempted} does not exist. Showing the ${position} page of goals`, 'warning');
      removeToast(removeId, 3500);
    } else if (CURRENT_PAGE < 1) {
      let attempted = CURRENT_PAGE;
      CURRENT_PAGE = 1;
      let removeId = setToast(`Page ${attempted} does not exist. Showing the first page of goals.`, 'warning');
      removeToast(removeId, 3500);
    };
  }
  START = (CURRENT_PAGE - 1) * ITEMS_PER_PAGE;
  END = CURRENT_PAGE * ITEMS_PER_PAGE;
  displayGoals = myGoals.slice(START, END);
  populateGoals(displayGoals);
  if (displayGoals !== null && displayGoals.length > 0) {
    enableEditing();
    enableDeleting();
  } else {
    let removeId = setToast('There are no goals to show...', 'info');
    removeToast(removeId, 3500);
  }
}

document.querySelector('#addNewGoalBtn').addEventListener('click', e => {
  addGoal();
  getGoals();
})

let modalCancelBtns = document.querySelectorAll('[data-type="cancelModal');
modalCancelBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    let elementId = btn.dataset.id;
    let modal = document.querySelector(`#${elementId}`);
    modal.classList.toggle('hidden');
  });
});

document.querySelector('#addGoalBtn').addEventListener('click', e => {
  toggleModal('#newGoalModal');
})


const enableEditing = () => {
  let editBtns = document.querySelectorAll('[data-type="edit"]');

  editBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      let id = btn.dataset.id;
      document.querySelector('#editId').value = id;
      let goalIndex = findGoal(id);
      let goal = myGoals[goalIndex];
      let isChecked = goal.status === 'Completed';
      document.querySelector('#editTitle').value = goal.title;
      document.querySelector('#editStatusComplete').checked = isChecked;
      document.querySelector('#editDesc').value = goal.desc;
      toggleModal('#editGoalModal');
    });
  });
  enableEditBtn();
}

const enableDeleting = () => {
  let deleteBtns = document.querySelectorAll('[data-type="delete"]');

  deleteBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      let id = btn.dataset.id;
      deleteHandler(id);
    });
  });
}

const deleteHandler = (id) => {
  myGoals = myGoals.filter(goal => goal.id !== id);
  saveGoals();
  displayGoals = myGoals;
  getGoals();
}

const enableEditBtn = () => {
  let toggler = document.querySelector('#editGoalBtn');
  toggler.removeEventListener('click', enableEditBtnHandler);
  toggler.addEventListener('click', enableEditBtnHandler);
}

const enableEditBtnHandler = () => {
  let id = document.querySelector('#editId').value;
  editGoal(id)
}

const enablePagination = ({
  previous,
  next
}) => {
  if (previous) {
    document.querySelector('#paginate-previous').addEventListener('click', e => {
      MAX_PAGE = Math.ceil(myGoals.length / 3);
      CURRENT_PAGE--;
      if (CURRENT_PAGE < 1) {
        CURRENT_PAGE = 1;
      };
      START = (CURRENT_PAGE - 1) * ITEMS_PER_PAGE;
      END = CURRENT_PAGE * ITEMS_PER_PAGE;
      displayGoals = myGoals.slice(START, END);
      getGoals()
    })
  }
  if (next) {
    document.querySelector('#paginate-next').addEventListener('click', e => {
      MAX_PAGE = Math.ceil(myGoals.length / 3);
      CURRENT_PAGE++;
      if (CURRENT_PAGE > MAX_PAGE) {
        CURRENT_PAGE = MAX_PAGE;
      };
      START = (CURRENT_PAGE - 1) * ITEMS_PER_PAGE;
      END = CURRENT_PAGE * ITEMS_PER_PAGE;
      displayGoals = myGoals.slice(START, END);
      getGoals()
    })
  }
  // getInfo();
}

document.querySelector('#clearGoalsBtn').addEventListener('click', e => {
  localStorage.myGoals = '[]';
  myGoals = JSON.parse(localStorage.getItem('myGoals'));
  displayGoals = myGoals;
  getGoals();
  let removeId = setToast('All goals were cleared.', 'warning');
  removeToast(removeId, 3500);
})


const saveGoals = () => {
  // Create a JSON string and save it to localStorage
  let goalsList = JSON.stringify(myGoals);
  localStorage.setItem('myGoals', goalsList);
};

const loadGoals = () => {
  myGoals = JSON.parse(localStorage.getItem('myGoals'));
  if (myGoals.length >= 1) {
    if (myGoals[0] instanceof Goal === false) {
      for (let i = 0; i < myGoals.length; i++) {
        let goal = myGoals[i];
        console.log(goal);
        myGoals[i] = Object.assign(new Goal(goal.title, goal.status, goal.desc, new Date(goal.createdAt)), myGoals[i]);
      }
    }
    displayGoals = myGoals;
  }
}

// Get the goals once
loadGoals();
getGoals();