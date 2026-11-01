### 1. CSS의 id 선택자와 class 선택자는 어떻게 다르며, 각각 어떤 상황에서 사용하는 것이 좋을까
id: 특정 요소를 고유하게 나타낼때 사용하며, 유일하다. class: 여러 번 나오는 콘텐츠일때
여러번 반복해서 특정 콘텐츠가 나온다면, class를 사용하여 동일한 style을 적용하기 용이하다.

### 2. margin과 padding은 어떤 차이가 있나요? box-sizing: border-box를 사용하면 무엇이 달라질까
margin과 padding의 차이점: margin은 요소 바깥쪽 여백으로 다른 요소와의 간격을 조절, padding은 요소 안쪽 여백으로 컨텐츠와 테두리
사이의 간격을 조절함.
box-sizing: border-box를 사용하면 설정한 width안에 padding과 Border를 포함해서 크기를 계산하므로 너비를 유지할 수 있다.