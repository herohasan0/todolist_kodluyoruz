let TODOS = [];
TODOS = JSON.parse(localStorage.getItem('todos'));
let ul = document.querySelector('#list');

for (let i = 0; i < TODOS.length; i++) {
  let li = document.createElement('li');
  li.innerHTML = TODOS[i];
  ul.append(li);
}

const btn = document.querySelector('#add');

btn.addEventListener('click', function () {
  let input = document.querySelector('#input').value;
  if (input) {
    let li = document.createElement('li');
    TODOS.push(input);
    localStorage.setItem('todos', JSON.stringify(TODOS));
    li.innerHTML = TODOS[TODOS.length - 1];
    ul.append(li);
    document.querySelector('#input').value = '';
  } else {
    alert('Lütfen geçerli bir değer giriniz!');
  }
});
