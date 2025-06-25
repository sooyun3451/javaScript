let todos = [];

const inputEl = document.getElementById('todo-input');
const btnAddEl = document.getElementById('btn-add-todo');
const printListEl = document.getElementById('todo-list');

btnAddEl.addEventListener('click', function() {
  let value = inputEl.value.trim();
  if(!value) return;
  todos.push({
    content: value,
    isDone: false,
    createdAt: new Date()
  });
  renderTodo();
});

function renderTodo() {
  printListEl.innerHTML = '';
  todos.forEach((todo, i) => {
    const li = document.createElement('li');
    const pContent = document.createElement('p');
    pContent.textContent = todo.content;
    li.appendChild(pContent);
    printListEl.appendChild(li);
  });
  inputEl.value = '';
}