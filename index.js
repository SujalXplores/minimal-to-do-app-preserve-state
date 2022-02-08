let todos = [];
todos = JSON.parse(localStorage.getItem("todo-history")) || [];
todos.forEach((todo) => {
  const { ul, li } = makeList();
  const checkbox = addCheckBox(todo.checked, todo.id);
  const task = todoDescription(todo.name);
  const delete_button = onDeleteHandler();

  appendToUl(ul, li, checkbox, task, delete_button);
});

// on add event listener
const form = document.getElementById("todo-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input_value = document.getElementById("note-input").value;

  if (input_value !== "") {
    const { ul, li } = makeList();
    const checkbox_data = Date.now();
    const checkbox = addCheckBox(false, checkbox_data);
    const task = todoDescription(input_value);
    const todo = {
      id: checkbox_data,
      name: input_value,
      checked: false
    };
    const delete_button = onDeleteHandler();

    appendToUl(ul, li, checkbox, task, delete_button);
    // add this to-do to the array
    todos.push(todo);
    // reset form after adding task
    form.reset();
  }
});

function appendToUl(ul, li, checkbox, task, delete_button) {
  li.appendChild(checkbox);
  li.appendChild(task);
  li.appendChild(delete_button);

  ul.append(li);
}

function makeList() {
  const ul = document.getElementById("todo-list");
  const li = document.createElement("li");

  li.className = "todo__task-li";

  return {
    ul,
    li
  };
}

function todoDescription(info) {
  const task = document.createElement("label");

  task.className = "todo__description";
  task.innerText = info;

  return task;
}

function onDeleteHandler() {
  const delete_button = document.createElement("span");

  delete_button.className = "material-icons delete_btn";
  delete_button.innerText = "delete";
  delete_button.addEventListener("click", () => {
    const checkbox =
      delete_button.previousElementSibling.previousElementSibling;
    const checkbox_data = checkbox.dataset.time;
    const index = todos.findIndex((todo) => todo.id == checkbox_data);

    if (index !== -1) {
      todos.splice(index, 1);
      delete_button.parentElement.remove();
    }
  });

  return delete_button;
}

function addCheckBox(isChecked, data_time) {
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.className = "todo__checkbox";
  checkbox.checked = isChecked;
  checkbox.setAttribute("data-time", data_time);
  checkbox.addEventListener("change", (e) => {
    const checkbox_data_time = e.target.getAttribute("data-time");
    todos.forEach((todo) => {
      if (todo.id == checkbox_data_time) {
        todo.checked = e.target.checked;
      }
    });
  });

  return checkbox;
}

// on refresh store todos to local storage
window.onbeforeunload = () => {
  console.log("Refresh happened!");
  localStorage.setItem("todo-history", JSON.stringify(todos));
};