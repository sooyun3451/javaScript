let todos = [];

const inputEl = document.getElementById('todo-input');
const btnAddEl = document.getElementById('btn-add-todo');
const printListEl = document.getElementById('todo-list');
const todoTpl = document.getElementById('todo-template');

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
    const cloneLi = todoTpl.content.firstElementChild.cloneNode(true);
    cloneLi.className = todo.isDone ? 'done' : '';

    const checkbox = cloneLi.querySelector('.checkDone');
    checkbox.checked = todo.isDone;
    checkbox.addEventListener('change', () => {
      todos[i].isDone = checkbox.checked;
      renderTodo();
    })

    cloneLi.querySelector('.content').textContent = todo.content;
    cloneLi.querySelector('.date').textContent = formatDate(todo.createdAt);
    printListEl.appendChild(cloneLi);
  })
  inputEl.value = '';
}

// 날짜 표시 형식을 변환하는 함수
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

/*
    todos.forEach((todo, i) => {
    const liEl = document.createElement('li');

    const divLeftEl = document.createElement('div');
    divLeftEl.classList.add('left');

    const checkEl = document.createElement('input');
    // checkEl.type = 'checkbox';
    checkEl.setAttribute('type', 'checkbox');
    checkEl.classList.add('check');
    divLeftEl.appendChild(checkEl);

    const pContentEl = document.createElement('p');
    pContentEl.classList.add('content');
    pContentEl.textContent = todo.content;
    divLeftEl.appendChild(pContentEl);
    
    const divRightEl = document.createElement('div');
    divRightEl.classList.add('right');
    
    const spanDateEl = document.createElement('span');
    spanDateEl.classList.add('date');
    divRightEl.appendChild(spanDateEl);
    
    const btnUpdateEl = document.createElement('button');
    btnUpdateEl.classList.add('btnUpdate');
    btnUpdateEl.textContent = '수정';
    divRightEl.appendChild(btnUpdateEl);
    
    const btnRemoveEl = document.createElement('button');
    btnRemoveEl.classList.add('btnRemove');
    btnRemoveEl.textContent = '삭제';
    divRightEl.appendChild(btnRemoveEl);

    liEl.appendChild(divLeftEl);
    liEl.appendChild(divRightEl);
    printListEl.appendChild(liEl);
  });
*/