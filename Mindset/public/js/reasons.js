import Reason from './Reason.js';

const reasonContainer = document.querySelector('[data-type="reason-display"]');
const reasonBtn = document.querySelector('[data-type="add-reason"');
const newReasonContainer = document.querySelector('#new-reason-container');

const demoReason = new Reason('I Need to Grow!');

let reasons = JSON.parse(localStorage.getItem('myReasons')) || [demoReason];

let currentReasonIndex = 0;

const nextReason = () => {
  let totalReasons = reasons.length;
  displayReason();
  // console.log(`totalReasons: ${totalReasons}
  // currentReasonIndex ${currentReasonIndex}
  // nextReasonIndex ${currentReasonIndex + 1}
  // `);
  currentReasonIndex++;
  if (currentReasonIndex >= totalReasons) {
    currentReasonIndex = 0;
  }
}

const displayReason = () => {
  reasonContainer.innerHTML = reasons[currentReasonIndex].toHTML();
}

const newReason = () => {
  newReasonContainer.classList.toggle('full-width');
  newReasonContainer.innerHTML = `
  <label>
  <p id="new-reason-msg"></p>
  I am doing this because...
  <input type="text" data-type="new-reason-content"></input>
  <button class="cancel-btn error" id="new-reason-cancel">Cancel</button>
  </label>`;
  enableCancelBtn();
  toggleReasonBtn(true);
}

const addReason = () => {
  let msgContainer = document.querySelector("#new-reason-msg");
  let content = document.querySelector('[data-type="new-reason-content"').value;
  content = content.trim();
  msgContainer.classList = "error";
  msgContainer.innerHTML = "";
  if (content === '') {
    msgContainer.innerHTML = "The reason field cannot be left empty. Please fill in a reason and try again.";
    msgContainer.classList = "toast error"
    return
  }
  if (content !== '') {
    newReasonContainer.classList.toggle('full-width');
    const reason = new Reason(content);
    reasons.push(reason);
    saveReasons();
  }
  /**********************************************************
   TO DO:
   MAKE A BUTTON TO CLOSE THE NEW REASON MODAL IN CASE YOU WANT TO EXIT

  **********************************************************/
  newReasonContainer.innerHTML = '';
  toggleReasonBtn(false);
}

const toggleReasonBtn = (on) => {
  if (on) {
    reasonBtn.removeEventListener('click', newReason);
    reasonBtn.addEventListener('click', addReason);
    reasonBtn.innerHTML = "Add Reason";
  } else {
    reasonBtn.removeEventListener('click', addReason);
    reasonBtn.addEventListener('click', newReason);
    reasonBtn.innerHTML = "New Reason";
  }
}

const enableCancelBtn = () => {
  let btn = document.querySelector('#new-reason-cancel');
  btn.addEventListener('click', e => {
    newReasonContainer.innerHTML = '';
    newReasonContainer.classList.toggle('full-width');
    toggleReasonBtn(false);
  })
}

toggleReasonBtn(false);

const saveReasons = () => {
  let myReasons = JSON.stringify(reasons);
  localStorage.setItem('myReasons', myReasons);
}

// add the first reason
const reasonLoop = () => setInterval(nextReason, 7000);

const checkLoop = () => {
  // console.log('checking loop');
  if (reasons.length > 1) {
    // console.log('reasons is longer than 1');
    currentReasonIndex++;
    reasonLoop();
    clearInterval(checkingReasons);
  };
}

const getReasons = () => {
  reasons = JSON.parse(localStorage.getItem('myReasons')) || [demoReason];
  // Check if the list of reasons is made up of Reason objects if not convert them to reason objects
  if (reasons[0] instanceof Reason === false) {
    for (let i = 0; i < reasons.length; i++) {
      reasons[i] = Object.assign(new Reason, reasons[i]);
    }
  }
}
getReasons();
displayReason();
let checkingReasons = setInterval(checkLoop, 3000);
checkingReasons;