let todos = [];

const inputEl = document.getElementById("todo-input");
const btnAddEl = document.getElementById("btn-add-todo");
const printListEl = document.getElementById("todo-list");
const todoTpl = document.getElementById("todo-template");

btnAddEl.addEventListener("click", function () {
  let value = inputEl.value.trim();
  if (!value) return;
  todos.push({
    content: value,
    isDone: false,
    createdAt: new Date(),
  });
  renderTodo();
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
      renderTodo();
    });
  });
  inputEl.value = "";
}
