/* This is a list of links stored as a JSON object
 The URL points to a folder because each week should have it's own directory. Projects may be grouped into the same directory if work is continued for longer than a week. */
const links = [{
    label: "Week 01 Notes",
    url: "views/w01.html"
  },
  {
    label: "Week 02 Notes",
    url: "views/w02.html"
  },
  {
    label: "Week 03 Notes",
    url: "views/w03.html"
  },
  {
    label: "Week 04 Notes",
    url: "views/w04.html"
  },
  {
    label: "Week 05 Notes",
    url: "views/w05.html"
  },
  {
    label: "To Do App",
    url: "views/toDo.html"
  },
  {
    label: "Week 07 Notes",
    url: "views/w07.html"
  }
]

function createToc() {
  let list = document.getElementById('toc');
  links.forEach(linkData => {
    let listItem = document.createElement("li");
    let linkItem = document.createElement("a");
    linkItem.classList = 'nav-link';
    linkItem.href = linkData['url'];
    linkItem.text = linkData['label'];
    linkItem.title = linkData['label'];

    listItem.appendChild(linkItem);
    list.appendChild(listItem);
  });
}

let navLinks = [{
  title: "Home",
  url: "../index.html"
}];

function createNav() {
  let nav = document.getElementById('main-nav');
  navLinks.forEach(linkData => {
    let list = document.createElement("ul");
    let listItem = document.createElement("li");
    let linkItem = document.createElement("a");
    linkItem.classList = 'top-nav-link';
    linkItem.href = linkData['url'];
    linkItem.text = linkData['title'];
    linkItem.title = linkData['title'];

    listItem.appendChild(linkItem);
    list.appendChild(listItem);
    nav.appendChild(list);
  });
}

const start = () => {
  createNav()
}