const form = document.querySelector('.form');
const input = document.querySelector('.input');
const list = document.querySelector('.ul-items');

let todos = [];

form.addEventListener('submit', function (event) {
  event.preventDefault();
  addTodo(input.value);
});

function addTodo(item) {
  if (item) {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };
    todos.push(todo);
    addToLocalStorage(todos);

    input.value = '';
  } else {
    document.querySelector('.top').innerHTML += `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
  Lütfen o küçük kutucuğu boş bırakmayınız :(
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
    `;
  }
}

function renderTodos(todos) {
  list.innerHTML = '';

  todos.forEach(function (item) {
    const checked = item.completed ? 'checked' : null;

    const li = document.createElement('li');
    li.setAttribute('class', 'item list-group-item');
    // li.setAttribute('class', 'list-group-item');
    li.setAttribute('data-key', item.id);

    if (item.completed) {
      li.classList.add('checked');
    }

    li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}> <span class="todo-item">${item.name}</span> <button class="delete-button btn-close"></button>`;

    list.append(li);
  });
}

function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');

  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}

list.addEventListener('click', function (event) {
  console.log(event.target.parentElement);
  if (event.target.type == 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});

getFromLocalStorage();
