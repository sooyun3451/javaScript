let todos = [];

const todoInputEl = document.getElementById('todoInput');
const addBtnEl = document.getElementById('addBtn');
const printListEl = document.getElementById('todoList');
const todoTempEl = document.getElementById('todoTemplate');

// (1) 세션 데이터 불러와 todos에 세팅하는 함수 선언 => 기존 데이터가 있을 수 있음.
// (ㄱ) data변수에 세션 데이터 저장하기
// (ㄴ) data변수의 값이 유효하면(쓸모있는 값이면) 다음의 동작 실행하기
//    (a) parsed변수에 변환된 data변수값 저장하기
//        세션스토리지의 데이터는 모두 문자열로 저장
//        현재 프로그램에서 적용해 쓸려면 배열, 객체 등의 형태로 전환 필요
//        => JSON.parse() 사용하면 됨
//     (b) todos(전체 할일 목록을 저장할 변수)의 제일 뒤쪽에 자료 추가하기
//        누구를? (a)의 전체 내용을
//         "...배열"은 전개연산자로 배열의 모든 요소를 복사해서 쓴다는 의미
function loadTodos() {
  const data = sessionStorage.getItem('todosData');
  if(data) {
    const parsed = JSON.parse(data);
    todos.push(...parsed);
  }
}

// (3) 할일의 변화를 세션에 저장하기
function saveTodos() {
  sessionStorage.setItem('todosData', JSON.stringify(todos));
}

// (4) 새로운 할 일 추가하기 
// (ㄱ) 변수 value에 사용자가 입력한 값을 저장하기. 이때, 앞뒤 공백 정리함(trim())
// (ㄴ) 만약 변수 value의 값이 유효하지 않다면. 여기서 클릭 이벤트 종료
// (ㄷ) 할 일을 저장할 변수 todos에 새로운 값 추가하기. 이때 할 일의 데이터는 객체로 처리해서 할일내용, 완료여부,, 작성시간을 가지도록 함.
// (ㄹ) 새롭게 추가된 데이터를 세션에 저장하는 함수 saveTodos() 호출하기
// (ㅁ) renderTodo()함수 호출해 화면에 todos값이 출력되게 만들기
addBtnEl.addEventListener('click', function() {
  let value = todoInputEl.value.trim();
  if(!value) return;
  todos.push({
    content: value,
    isDone: false,
    createdAt: new Date()
  });
  todoInputEl.value = '';
  saveTodos();
  renderTodo();
});

// (5)renderTodo()함수 정의
// (ㄱ) 할 일을 출력할 영역을 비우기 => todos의 데이터 내용이 변경될 때마다 변경된 내용을 바탕으로 화면에 새로 그려줌.그래서 기전에 출력된 내용을 삭제하는 것.
// (ㄴ) todos 배열의 요소만큼 반복해서 다음 명령을 처리함.
//    (a) cloneLi변수에 템플릿 내용 복사해서 노드로 처리하기
//    (b) cloneLi변수의 클래스 속성 부여하기
//        할 일의 완료여부를 기준으로 클래스 이름을 설정함.
//        할 일의 완료여부는 각 todo에 저장된 isDone속성값에 의해 결정됨.
//        => 사용자 뷰를 변경하기 위해서 css에서 스타일 처리하기
//    (c) checkBoxEl변수에 cloneLi내부의 체크박스 저장하기
//    (d) 체크박스의 체크상태값으로 각 todo에 저장된 isDone속성값을 할당함
//        => 화면에 렌더링 되는 시점에 각 체크박스의 상태를 결정하기 위해 
//    (e) 체크박스에 change이벤트 추가하기(change이벤트는 입력요소의 상태변경을 감지함)
//        (A) todos의 isDone프로퍼티의 값으로 체크박스의 checked상태값 저장하기
//            : 클릭으로 체크상태 만들었다 => true값 저장
//            : 클릭으로 체크해제상태 만들었다 => false값 저장
//        (B) 데이터의 변경이 있으니 세션에 데이터를 저장하는 saveTodos()함수 호출
//        (C) 데이터의 변경이 있으니 데이터를 그려주는 renderTodo()함수 호출
//    (f) 할 일 내용을 입력할 영역을 선택해 텍스트 내용으로 todo의 content프로퍼티 값 할당
//    (g) 날짜를 입력할 영역을 선택해 텍스트내용으로 todo의 date프로퍼티값 할당
//        이때, 날짜 데이터가 세션저장을 위해 문자열로 변환하는 과정을 거치면서 문자열 자료로 불러와짐 => 날자 객체의 메서드 적용 불가함.
//        그래서 문자열로 인식되고 있는 날짜 데이터를 새로운 date객체로 생성하고(new Date())필요한 메서드 적용해서 사용함.
//    (h) updateBtn 변수에 수정버튼 수집하기
//    (i) updateBtn 변수에 클릭이벤트 연결
//        (A) prompt()를 실행해 수정된 할일 저장하기 => newContent변수에
//        (B) 만약 newContent변수가 유효한 값을 가지고 있다면
//          (aa) trimNewContent변수에 앞뒤의 공백 제거해서 저장하기
//          (bb) todo의 content 프로퍼티에 trimNewContent변수값 할당하기
//          (cc) 데이터 변경되었으니 세션에 데이터 새로 저장 => saveTodos()
//          (dd) 데이터 변경되었으니 화면에 데이터 새로 그리기 => renderTodo()
//    (j) removeVtn변수에 삭제버튼 수집하기
//    (k) removeBtn에 클릭 이벤트 연결
//        (A) comfirm()실행해 가부 저장하기 => al변수에
//        (B) 만약 al 변수가 참이라면(confirm에서 ok버튼 눌렀다면)
//          (aa) todos전체 배열에서 자료 삭제하기
//                splice(삭제할 자료의 인덱스 번호, 삭제할 자료의 개수)
//          (bb) 데이터 변경되었으니 세션에 데이터 새로 저장 => saveTodos()
//          (cc) 데이터 변경되었으니 화면에 데이터 새로 그리기 => renderTodo()
//    () printListEl(할 일 목록을 담을 ul태그)의 자식요소로 cloneLi 연결하기
function renderTodo() {
  printListEl.innerHTML = '';
  todos.forEach((todo, i) => {
    const cloneLi = todoTempEl.content.firstElementChild.cloneNode(true);
    cloneLi.className = todo.isDone ? 'done' : '';
    
    const checkBoxEl = cloneLi.querySelector('.checkDone');
    checkBoxEl.checked = todo.isDone;
    checkBoxEl.addEventListener('change', () => {
      todo.isDone = checkBoxEl.checked;
      saveTodos();
      renderTodo();
    });
    cloneLi.querySelector('.content').textContent = todo.content;
    cloneLi.querySelector('.date').textContent = new Date(todo.createdAt).toLocaleDateString();

    const updateBtn = cloneLi.querySelector('.updateBtn');
    updateBtn.addEventListener('click', () => {
      const newContent = prompt('할 일을 수정해주세요.', todo.content);
      if(newContent) {
        const trimNEwContent = newContent.trim();
        todo.content = trimNEwContent;
        saveTodos();
        renderTodo();
      }
    });

    const removeBtn = cloneLi.querySelector('.removeBtn');
    removeBtn.addEventListener('click', () => {
      let al = confirm('정말 삭제하시겠습니까?');
      if(al) {
        todos.splice(i, 1);
        saveTodos();
        renderTodo();
      }
    });
    printListEl.appendChild(cloneLi);
  });

}

// (2) 1번 함수 호출해 실행하기
loadTodos();
// (6) renderTodo()함수 호출해 실행
renderTodo();