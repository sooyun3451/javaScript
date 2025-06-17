let s1 = document.getElementById('s1');
console.log(s1);
console.log(s1.innerHTML); // <strong>태그입니다.</strong> => 영역에 포함된 태그도 문자열로 처리
console.log(s1.innerText); // div태그입니다. => 영역에 포함된 문자열만 처리

let s2 = document.getElementsByClassName('s2');
console.log(s2); // HTMLCollection(3) [div.s2, div.s2, div.s2] => 배열처럼 보이지만 배열 X, 유사배열
// => for문, for...of문 ok / forEach x 
for(let i = 0; i < s2.length; i++) {
  console.log(s2[i]);
}

for(let item of s2) {
  console.log(item);
}

console.log('==========');

let a1 = document.querySelector('#s1');
console.log(a1);

let a2 = document.querySelectorAll('.s2');
console.log(a2); // NodeList(3) [div.s2, div.s2, div.s2] => 유사배열

// 동적 VS 정적
// 정적이다 => 호출 된 시점의 상태가 고정된다. querySelector로 대상에 접근하면 정적으로 처리됨.
// 동적이다 => 상황에 맞춰 상태가 변한다.getElementBy로 대상에 접근하면 동적으로 처리됨.

// 자바스크립트 명령에 의해 생성된 버튼을 클릭하려면 => 버튼을 동적으로 처리해야 합.

let s3 = document.getElementById('s3');
let p = document.createElement('p');
p.textContent = 's3 p입니다.'
s3.appendChild(p);

let items = ['사과', '바나나', '참외'];

let s4 = document.getElementById('s4');
let ul = document.createElement('ul');

items.forEach(item => {
  let li = document.createElement('li');
  li.classList.add('list');
  li.textContent = item;
  ul.appendChild(li);
});
s4.appendChild(ul);