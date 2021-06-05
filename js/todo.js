class Task {
  constructor(body, finished, id) {
    this.body = body;
    this.finished = finished;
    this.id = id;
  }
}

let demoTasks = [];
demoTasks.push(new Task(
  'This is an example of an active task.',
  false,
  0
));
demoTasks.push(new Task(
  'This is another example of a completed task',
  true,
  1
));

let displayTasks;
let currentFilter;

let list = document.getElementById('toDoList');

function populate(filter) {
  displayTasks = filterList(filter);
  currentFilter = filter;
  list.innerHTML = "";
  for (let i = 0; i < displayTasks.length; i++) {
    let item = document.createElement('li');
    item.innerHTML = `
        <li class="taskContainer">
          <label for="task${i}" class="task">
            <input type="checkbox" name="task${i}" id="t-${i}" class="check" ${displayTasks[i].finished ? "checked" : ""}>
            <span class="checkbox">X</span>
            <p class="taskText">${displayTasks[i].body}</p>
          </label>
          <button onclick="removeTask(${displayTasks[i].id})"
          class="removeBtn">X</button>
        </li>`;
    list.appendChild(item);
  }
  setEvents();
}

const getTasks = () => {
  return localStorage.getItem("myTasks") !== null ? localStorage.getItem("myTasks") : JSON.stringify(demoTasks);
}

const filterList = (filter) => {
  displayTasks = JSON.parse(getTasks());
  if (filter === "active") {
    displayTasks = JSON.parse(getTasks()).filter(x => {
      return x.finished === false;
    });
  } else if (filter === "completed") {
    displayTasks = JSON.parse(getTasks()).filter(x => {
      return x.finished;
    });
  }
  return displayTasks;
}

const setCounter = () => {
  let counter = document.getElementById('toDoCounter');
  count = filterList("active").length;
  counter.innerText = count != 1 ? `${count} tasks left` : `${count} task left`;
}

const setEvents = () => {
  let checkboxes = document.querySelectorAll(".check");
  checkboxes.forEach((x) => {
    x.addEventListener('click', (e) => {
      myTasks = JSON.parse(getTasks());
      let i = e.target.id.replace('t-', "");
      myTasks[i].finished = !myTasks[i].finished;
      setCounter();
      localStorage.setItem("myTasks", JSON.stringify(myTasks));
      populate(currentFilter);
    });
  });
}

const addTask = () => {
  let taskInput = document.getElementById('addTask');
  let body = taskInput.value;
  let id = myTasks.length;
  let newTask = new Task(body, false, id);
  myTasks.push(newTask);
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
  populate(currentFilter);
  taskInput.value = "";
  setCounter();
}

const removeTask = (i) => {
  myTasks = myTasks.filter(x => {
    return x.id !== i
  })
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
  populate(currentFilter);
  setCounter();
};


localStorage.setItem("myTasks", getTasks());
let myTasks = JSON.parse(getTasks());
populate();
setCounter();