const toggleModal = (id) => {
  let modal = document.querySelector(id);
  modal.classList.toggle('hidden');
}

export {
  toggleModal
};