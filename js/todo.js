class Task {
  constructor(body, finished, id) {
    this.body = body;
    this.finished = finished;
    this.id = id;
  }
}

let toDoList = []
let tsk1 = new Task(
  'This is an example of an active task.',
  false,
  0
);
let tsk2 = new Task(
  'This is another example of a completed task',
  true,
  1
);
toDoList.push(tsk1);
toDoList.push(tsk2);


let myTasks = toDoList;
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
          <label for="demo-task" class="task">
            <input type="checkbox" name="demo-task" id="t-${i}" class="check" ${displayTasks[i].finished ? "checked" : ""}>
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
  return myTasks;
}

const filterList = (filter) => {
  console.log(filter);
  displayTasks = myTasks;
  if (filter === "active") {
    displayTasks = myTasks.filter(x => {
      return x.finished === false;
    });
  } else if (filter === "completed") {
    displayTasks = myTasks.filter(x => {
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
      myTasks = getTasks();
      let i = e.target.id.replace('t-', "");
      myTasks[i].finished = !myTasks[i].finished;
      setCounter();
      populate(currentFilter);
    });
  });
}

const addTask = () => {
  let taskInput = document.getElementById('addTask');
  let body = taskInput.value;
  console.log(myTasks.length);
  let id = myTasks.length;
  let newTask = new Task(body, false, id);
  console.log(newTask);
  console.log(myTasks);
  myTasks.push(newTask);
  console.log(myTasks.length);
  populate(currentFilter);
  taskInput.value = "";
  setCounter()
}

const removeTask = (i) => {
  console.log(myTasks.length);
  myTasks = myTasks.filter(x => {
    console.log(x.id, " ", i);
    return x.id !== i
  })
  console.log(myTasks.length);
  populate(currentFilter);
  setCounter();
};


myTasks = getTasks();
console.log(myTasks);
populate();
setCounter();