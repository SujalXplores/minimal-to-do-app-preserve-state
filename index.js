(() => {
  let todos = [];
  const form = document.getElementById('todo-form');

  // fetch from local storage every time the page loads
  window.addEventListener('DOMContentLoaded', () => {
    todos = JSON.parse(localStorage.getItem('todo-history')) || [];

    todos.forEach((todo) => {
      const { ul, li } = makeList();

      const checkbox = addCheckBox(todo.checked, todo.id);

      const task = todoDescription(todo.name);

      const index = todos.indexOf(todo);
      const delete_button = delete_btn(index);

      appendToUl(ul, li, checkbox, task, delete_button);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input_value = document.getElementById('note-input').value;

    if (input_value !== '') {
      const { ul, li } = makeList();

      const checkbox_data = Date.now();
      const checkbox = addCheckBox(false, checkbox_data);

      const task = todoDescription(input_value);

      // add this to-do to the array
      const todo = {
        id: checkbox_data,
        name: input_value,
        checked: false,
      };

      const index = todos.indexOf(todo);
      const delete_button = delete_btn(index);

      appendToUl(ul, li, checkbox, task, delete_button);

      todos.push(todo);

      // reset form after adding task
      form.reset();
    }
  });

  window.onbeforeunload = () => {
    localStorage.setItem('todo-history', JSON.stringify(todos));
  };

  function appendToUl(ul, li, checkbox, task, delete_button) {
    li.appendChild(checkbox);
    li.appendChild(task);
    li.appendChild(delete_button);

    ul.append(li);
  }

  function makeList() {
    const ul = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.className = 'todo__task-li';

    return {
      ul,
      li,
    };
  }

  function todoDescription(info) {
    const task = document.createElement('label');
    task.className = 'todo__description';
    task.innerText = info;

    return task;
  }

  function delete_btn(index) {
    const delete_button = document.createElement('span');
    delete_button.className = 'material-icons delete_btn';
    delete_button.innerText = 'delete';

    delete_button.addEventListener('click', () => {
      delete_button.parentElement.remove();
      if (index !== -1) {
        todos.splice(index, 1);
      }
    });

    return delete_button;
  }

  function addCheckBox(isChecked, data_time) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo__checkbox';
    checkbox.checked = isChecked;

    const checkbox_data = data_time;
    checkbox.setAttribute('data-time', checkbox_data);

    checkbox.addEventListener('change', (e) => {
      const checkbox_data = e.target.getAttribute('data-time');
      todos.forEach((todo) => {
        if (todo.id == checkbox_data) {
          todo.checked = e.target.checked;
        }
      });
    });

    return checkbox;
  }
})();
