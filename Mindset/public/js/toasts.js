import Toast from './Toast.js';

let toastList = [];

const setToast = (message, style = 'info') => {
  // This is essentially a wrapper function to make sure that we have a default style to fall back on.
  const newToast = new Toast(message, style);
  toastList.push(newToast);
  // console.log(toastList);
  displayToasts();
  return toastList[toastList.length - 1].id;
}

const displayToasts = () => {
  // Set auto delete when more than 3 toasts are present
  if (toastList.length > 3) {
    removeToast(toastList[0].id, 1000);
    removeToast(toastList[1].id, 3000);
    removeToast(toastList[2].id, 5000);
  }
  // Get the container
  let container = document.querySelector('#toast-container');
  // Clear the HTML Values
  container.innerHTML = "";
  // display all toasts
  toastList.forEach(toast => {
    // Create a new paragraph
    let newToast = document.createElement('p');
    // add the classes it needs for styling
    newToast.classList = `message toast ${toast.style}`;
    // set the message and delete button
    newToast.innerHTML = `${toast.message}<span data-type="removeToastBtn" data-id="${toast.id}" class="clear-toast">X</span>`;
    // add the paragraph to the html
    container.appendChild(newToast);
  })
  //add the event listener for the delete button
  let removeToastBtns = document.querySelectorAll('[data-type="removeToastBtn"]');
  removeToastBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      removeToast(btn.dataset.id, true);
    })
  })
};

const removeToast = (id, immediate) => {
  let delay = immediate === true ? 0 : immediate;
  setTimeout(() => {
    toastList = toastList.filter(toast => toast.id !== parseInt(id));
    displayToasts();
  }, delay);
}

export {
  toastList,
  setToast,
  displayToasts,
  removeToast
}