const selectedNumbers = []; // 슬롯 데이터를 저장하는 배열
const slotsEl = document.getElementsByClassName('slot');
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
    console.log(slot);
    this.disabled = true;
  });
  keypad.appendChild(btn);
}