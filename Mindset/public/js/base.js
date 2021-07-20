let navToggler = document.querySelector("#nav-toggler");
navToggler.addEventListener('click', e => {
  toggleNav();
})

const toggleNav = () => {
  let header = document.querySelector("header");
  let list = document.querySelector("#nav-list");
  navToggler.classList.toggle('close');
  list.classList.toggle('hidden');
};

/**********************************************************
 TO DO:
 Create the function to build the app using a JSON file as the list of routes.
**********************************************************/
const buildNav = ()=>{
console.log(`I haven't been written yet`)
}