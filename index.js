(() => {
  let todos = [];
  const form = document.getElementById('todo-form');

  // Get Todos from localStorage on load
  window.addEventListener('DOMContentLoaded', () => {
    todos = JSON.parse(localStorage.getItem('todo-history')) || [];

    todos.forEach((todo) => {
      // list
      const ul = document.getElementById('todo-list');
      const li = document.createElement('li');
      li.className = 'todo__task-li';

      // checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'todo__checkbox';
      checkbox.checked = todo.checked;
      // setting unique id to checkbox
      checkbox.setAttribute('data-time', todo.id);
      // on checkbox checked listner
      checkbox.addEventListener('change', (e) => {
        const checkbox_data = e.target.getAttribute('data-time');
        todos.forEach((todo) => {
          if (todo.id == checkbox_data) {
            todo.checked = e.target.checked;
          }
        });
        console.log(todos);
      });

      // label
      const task = document.createElement('label');
      task.className = 'todo__description';
      task.innerText = todo.name;

      // delete button
      const delete_button = document.createElement('span');
      delete_button.className = 'material-icons delete_btn';
      delete_button.innerText = 'delete';

      // on delete button click listner
      delete_button.addEventListener('click', () => {
        delete_button.parentElement.remove();
        const index = todos.indexOf(todo);
        if (index !== -1) {
          todos.splice(index, 1);
        }
      });

      // append to list
      li.appendChild(checkbox);
      li.appendChild(task);
      li.appendChild(delete_button);

      ul.append(li);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo_description = document.getElementById('note-input').value;

    if (todo_description !== '') {
      // list
      const ul = document.getElementById('todo-list');
      const li = document.createElement('li');
      li.className = 'todo__task-li';

      // checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'todo__checkbox';
      checkbox.checked = false;
      const checkbox_data = Date.now();
      checkbox.setAttribute('data-time', checkbox_data);
      // on checkbox checked listner
      checkbox.addEventListener('change', (e) => {
        const checkbox_data = e.target.getAttribute('data-time');
        todos.forEach((todo) => {
          if (todo.id == checkbox_data) {
            todo.checked = e.target.checked;
          }
        });
        console.log(todos);
      });

      // label
      const task = document.createElement('label');
      task.className = 'todo__description';
      task.innerText = todo_description;

      // delete button
      const delete_button = document.createElement('span');
      delete_button.className = 'material-icons delete_btn';
      delete_button.innerText = 'delete';

      // on delete button click listner
      delete_button.addEventListener('click', () => {
        delete_button.parentElement.remove();
        const index = todos.indexOf(todo);
        if (index !== -1) {
          todos.splice(index, 1);
        }
      });

      // append to list
      li.appendChild(checkbox);
      li.appendChild(task);
      li.appendChild(delete_button);

      ul.append(li);

      // add this to-do to the array
      const todo = {
        id: checkbox_data,
        name: todo_description,
        checked: false,
      };
      todos.push(todo);

      // reset form after adding task
      form.reset();
    }
  });

  window.onbeforeunload = () => {
    localStorage.setItem('todo-history', JSON.stringify(todos));
  };
})();
