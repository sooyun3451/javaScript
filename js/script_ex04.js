let todos = [];

const inputEl = document.getElementById("todo-input");
const btnAddEl = document.getElementById("btn-add-todo");
const printListEl = document.getElementById("todo-list");
const todoTpl = document.getElementById("todo-template");
const todoBtnEl = document.getElementById('todo-button');
const completeBtnEl = document.getElementById('complete-button');
const count = document.getElementById('count');

function loadTodos() {
  const data = sessionStorage.getItem('todoData');
  if(data) {
    const parsed = JSON.parse(data);
    todos.push(...parsed);
  }
}

function saveTodos() {
  sessionStorage.setItem('todoData', JSON.stringify(todos));
}

btnAddEl.addEventListener("click", function () {
  let value = inputEl.value.trim();
  if (!value) return;
  todos.push({
    content: value,
    isDone: false,
    createdAt: new Date(),
  });
  renderTodo();
  console.log(todos);
});

function renderTodo() {
  printListEl.innerHTML = "";
  todos.forEach((todo, i) => {
    const ul = document.getElementById("todo-list");

    ul.innerHTML = `
      <li>
        <div class="left">
          <input type="checkbox" class="checkDone"></input>
          <p class="content">${todo.content}</p>
        </div>
        <div class="right">
          <span>${todo.createdAt.toLocaleString()}</span>
          <button class="updateBtn">수정</button>
          <button class="removeBtn">삭제</button>
        </div>
      </li>
    `;

    const li = document.querySelector("li");
    li.className = todo.isDone ? "done" : "";

    const checkbox = document.querySelector(".checkDone");
    checkbox.checked = todo.isDone;
    checkbox.addEventListener("change", () => {
      todos[i].isDone = checkbox.checked;
      saveTodos();
      renderTodo();
    });

    const updateBtn = document.querySelector('.updateBtn');
    updateBtn.addEventListener('click', () => {
      const newContent = prompt('할 일을 수정해주세요.', todo.content);
      if(newContent) {
        const trimNEwContent = newContent.trim();
        todo.content = trimNEwContent;
        saveTodos();
        renderTodo();
      }
    });

    const removeBtn = document.querySelector('.removeBtn');
    removeBtn.addEventListener('click', () => {
      let al = confirm('정말 삭제하시겠습니까?');
      if(al) {
        todos.splice(i, 1);
        saveTodos();
        renderTodo();
      }
    });
  });
  inputEl.value = "";
}

todoBtnEl.addEventListener('click', () => {
  const todoList = todos.filter((todo) => todo.isDone === false);
  count.textContent = '';
  count.textContent = `해야할 일: ${todoList.length}`;
});

completeBtnEl.addEventListener('click', () => {
  const completeList = todos.filter((todo) => todo.isDone === true);
  count.textContent = '';
  count.textContent = `완료한 일: ${completeList.length}`;
});
