const selectedNumbers = []; // 슬롯 데이터를 저장하는 배열
const slotsEl = document.querySelectorAll('.slot'); // forEach적용을 위해
const keypad = document.getElementById('keypad');

// 번호키 생성하기 - 1~45회 반복되는 반복문 설정
// (1) 새로운 button태그 노드를 만들어 btn변수에 할당
// (2) btn변수의 내용으로 i변수값 할당
// (4) btn변수(=버튼태그) 각각에 value속성값으로 i변수값 할당
// (5) btn변수 각각에 id속성값으로 btn1~btn45 할당
//    (ㄱ) 만약 슬롯 배열(selectedNumbers변수)의 길이가 6개 이상이면
//        여기서 클릭 이벤트 명령 종료하기
//    (ㄴ) 클릭한 버튼의 value값을 수집해 변수에 저장시킴
//        입력폼의 value속성값을 수집하면 문자열 상태로 저장됨
//        그래서 parseInt()로 값을 숫자로 변환해서 저장함.
//    (ㅁ) 슬롯에 숫자내용을 채우기 위해 slotsEl에서 현재 접근할 대상의 인덱스를
//        저장
//    (ㅂ) slotsEl에서 값을 저장할 대상을 뽑아 변수에 저장
//    (ㅅ) (ㅂ)에 (ㄴ)을 내용으로 할당하기
//    (ㅇ) 스타일 변경을 위해 (ㅂ)에 클래스 추가하기
//    (ㅈ) (ㅂ)에 dataset으로 value속성 추가해 (ㄴ)을 할당하기
//    (ㄹ) 클릭한 버튼을 비활성화 => desabled 속성으로
//    (ㄷ) 슬롯배열에 추가하기 => push()
// (3) keypad변수의 자식노드로 btn변수 설정
for(let i = 1; i <= 45; i++) {
  const btn = document.createElement('button');
  btn.textContent = i;
  btn.value = i;
  btn.id = `btn${i}`;
  btn.addEventListener('click', function() {
    if(selectedNumbers.length >= 6) return;
    const number = parseInt(this.value);
    selectedNumbers.push(number);
    const idx = selectedNumbers.length - 1;
    const slot = slotsEl[idx];
    slot.textContent = number;
    slot.classList.add('active');
    slot.dataset.value = number;
    this.disabled = true;
  });
  keypad.appendChild(btn);
}

// 슬롯의 각 버튼은 개별로 존재하는 것이 아니라, 유사배열 형태로 묶여있음.
// 그래서 forEach를 사용해 각 슬롯 버튼에 접근할 수 있도록 만들어야함.
slotsEl.forEach((slot, i) => {
  // 슬롯의 번호를 클릭하면
  //    1) 슬롯의 dataset중 value속성의 값을 숫자로 변환해 저장
  //    2) 만약 1번이 유효하지 않으면 여기서 명령 종료(반환)
  //    - 슬롯 데이터 배열에서 제거
  //    3) 제거할 데이터의 인덱스값(자리값, 순서값)을 저장 => indexOf()
  //    4) 슬롯 데이터 배열에서 3번에 해당하는 값을 제거 
  //      => splice(인덱스번호, 삭제할 데이터 개수)
  //      이때, 3번의 값이 -1이 아닐때만 동작하도록 만들기 => 안전장치
  //      왜 -1인가? indexOf()의 명령으로 자료의 순서값을 저장할때 다상 배열에
  //      해당 자료가 존재하지 않으면 -1을 반환시킴
  //      그래서 조건문에 3번의 값이 -1이 아닐때라고 설정한다면 실제 슬롯
  //      데이터 배열에 값이 존재하는지에 대한 확인을 거칠 수 있음
  //    - 슬롯 UI초기화
  //    5) 슬롯의 글자내용을 공백처리
  //    6) active클래스 삭제
  //    7) dataset의 value속성 삭제 => delete
  //    - 키패드 버튼 활성화
  //    8) 활성화시킬 버튼 선택해서 저장
  //      활성화시킬 버튼의 id속성값은 `btn${value}`로 표현됨
  //    9) 8번의 disabled를 false 처리하기
  //      이때도 if조건문으로 btn의 유효송을 검증해 안전하게 동작하도록 만들기
  //    - 나머지 슬롯 정리하기
  //    => 전체슬롯을 비우고, 슬롯 데이터 배열을 바탕으로 채우는 동작을 처리하기
  //    10) 전체 슬롯을 대상으로 반복처리
  //      a) 각 슬롯의 글자내용 비우기
  //      b) 각 슬롯의 active클래스 삭제
  //      c) 각 슬롯의 dataset에 있는 value속성 삭제
  //    11) 슬롯 데이터 배열을 대상으로 반복처리
  //      a) 각 데이터와 같은 인덱스값을 가지는 슬롯에 내용 채우기
  //      b) 각 데이터와 같은 인덱스값을 가지는 슬롯에 active클래스 추가
  //      c) 각 데이터와 같은 인덱스값을 가지는 슬롯의 dataset의 value속성 추가
  slot.addEventListener('click', () => {
    const value = parseInt(slot.dataset.value);
    if(!value) return;
    const idx = selectedNumbers.indexOf(value);
    if(idx !== -1) selectedNumbers.splice(idx, 1);
    slot.textContent = '';
    slot.classList.remove('active');
    delete slot.dataset.value;
    const btn = document.getElementById(`btn${value}`);
    if(btn) btn.disabled = false;
    slotsEl.forEach(s => {
      s.textContent = '';
      s.classList.remove('active');
      delete s.dataset.value;
    });

    selectedNumbers.forEach((num, idx) => {
      slotsEl[idx].textContent = num;
      slotsEl[idx].classList.add('active');
      slotsEl[idx].dataset.value = num;
    });
  });
});

// 당첨번호 생성 함수 선언
//    1) 1~45의 숫자값을 요소로 가지는 배열 생성하기
//    2) 1번 배열 요소들을 무작위로 섞어주기
//    3) 2번에서 6개를 잘라 새로운 배열로 저장하고, 오름차순으로 정리하기
//    => 당첨번호
//    4) 2번에서 7번째 숫자를 수집해 저장 => 보너스 번호
//    5) 당첨번호와 보너스번호를 객체로 묶어 반환하기
function generateLotto() {
  const allNumbers = Array.from({length:45}, (_, i) => i + 1);
  const shuffled = allNumbers.sort(() => 0.5 - Math.random());

  const main = shuffled.slice(0, 6).sort((a, b) => a - b);
  const bonus = shuffled[6];

  return {main, bonus};
}
console.log(generateLotto());
// 객체를 표현하는 방법
// 리턴값 {main, bonus}는 객체 유형의 자료
// main속성의 값으로 main변수를 할당하고, 
// bonus속성의 값으로 bonus변수를 할당한다는 의미
// 즉, 아래와 같은 형태로 리턴값을 만들어야함
// {
//    main: main
//    bonus: bonus
// }
// 이때 프로퍼티(속성)의 이름과 값으로 사용하는 변수의 이름을 일부러 일치시켜
// 다음과 같이 단축해서 쓸 수 있음
// {
//    main,
//    bonus
// }
// 이렇게 단축해 표현한 값을 한 줄로 나란히 작성해 표현할 수 있음.
// {main, bonus}