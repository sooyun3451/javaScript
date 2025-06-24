let menu = {
  coffee: "커피",
  latte: "라떼",
  icetea: "아이스티",
};

let price = {
  coffee: 3000,
  latte: 3500,
  icetea: 2500,
};

// 주문내역을 저장할 객체
let order = {};

const orderBtns = document.getElementById("orderBtn");
const orderList = document.getElementById("orderList");

// 키오스크 버튼 클릭
orderBtns.addEventListener("click", function (e) {
  // 클릭이벤트로 발생하는 동작을 묶어두는 함수의 매개변수로 e를 사용
  // 매개변수 e는 이벤트 객체를 가리킴.
  // 이벤트 객체란? 이벤트가 발생하면서 생성되는 정보가 저장된 자료

  // e.target은 실제 클릭이 일어난 영역을 수집함
  // 그래서 li부분을 클릭하면 li태그 전체 내용이, button부분을 클릭하면 button태그 전체 내용이 저장됨
  // console.log(e.target);

  // e.target.tagName은 실제 클릭이 일어난 영역의 태그이름만 수집함
  // 이때, 태그이름이 대문자로 저장됨
  // console.log(e.target.tagName);
  if (e.target.tagName === "BUTTON") {
    // console.log(e.target.textContent);
    // console.log(e.target.dataset.drink);
    let drink = e.target.dataset.drink;
    addItem(drink);
  }
});

orderList.addEventListener("click", function (e) {
  const drink = e.target.dataset.drink;
  if (!drink) return;

  if (e.target.classList.contains("increase")) {
    addItem(drink);
  } else if (e.target.classList.contains("decrease")) {
    removeItem(drink);
  }
});

// 화면 출력 함수
function renderOrder() {
  const orderList = document.getElementById("orderList");
  const totalPrice = document.getElementById('totalPrice');
  orderList.innerHTML = "";
  const orderListUl = document.createElement("ul");
  let total = 0;

  // for...in 반복문. 객체의 프로퍼티 개수만큼 반복처리
  // 여기서 drink는 메뉴이름으로 보면 됨
  for (const drink in order) {
    const orderListLi = document.createElement("li");
    const quantity = order[drink];
    const orderPrice = price[drink] * quantity;
    total += orderPrice;

    orderListLi.innerHTML = `
          <p class="menu-name">${menu[drink]} (${orderPrice.toLocaleString()} 원)</p>
          <p class="menu-quantity">
          <button class="decrease" data-drink="${drink}"> - </button>
          <span>${quantity}</span>
          <button class="increase" data-drink="${drink}"> + </button>
          </p>
        `;
    orderListUl.appendChild(orderListLi);
  }
  orderList.appendChild(orderListUl);
  totalPrice.textContent = total.toLocaleString();
}

// 수량 변경
function addItem(drink) {
  if (!order[drink]) order[drink] = 0;
  order[drink]++;
  renderOrder();
}

function removeItem(drink) {
  if (!order[drink]) return;
  order[drink]--;
  if (order[drink] === 0) delete order[drink];
  renderOrder();
}
