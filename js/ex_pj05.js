let todos = [];

const inputEl = document.getElementById('todoInput');
const buttonEl = document.getElementById('addBtn');
const todoListEl = document.getElementById('todoList');
const todoTempEl = document.getElementById('todoTemplate');

function loadTodos() {
  const data = sessionStorage.getItem('todosData');
  if(data) {
    const parsed = JSON.parse(data);
    todos.push(...parsed);
  }
}

function saveTodos() {
  sessionStorage.setItem('todosData', JSON.stringify(todos));
}

buttonEl.addEventListener('click', () => {
  const value = inputEl.value.trim();
  if(!value) return;
  todos.push({
    content: value,
    isDone: false,
    createdAt: new Date()
  });
  inputEl.value = '';
  saveTodos();
  renderTodo();
});

function renderTodo() {
  todoListEl.innerHTML = '';
  todos.forEach((todo, i) => {
    const cloneLi = todoTempEl.content.firstElementChild.cloneNode(true);
    cloneLi.classList = todo.isDone ? 'done' : '';

    const checkBoxEl = cloneLi.querySelector('.checkDone');
    checkBoxEl.checked = todo.isDone;
    checkBoxEl.addEventListener('change', () => {
      todo.isDone = checkBoxEl.checked;
      saveTodos();
      renderTodo();
    });

    cloneLi.querySelector('.content').textContent = todo.content;
    cloneLi.querySelector('.date').textContent = new Date(todo.date).toLocaleDateString();
  })
}

loadTodos();
renderTodo();