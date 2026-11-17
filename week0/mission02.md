# Mission 02 - CSS

## 1. CSS의 `id` 선택자와 `class` 선택자는 어떻게 다르며, 각각 어떤 상황에서 사용하는 것이 좋을까요?

id 선택자는 #이름으로 쓰고, 문서 안에서 하나의 요소에만 붙일 수 있는 고유한 이름이다.
class 선택자는 .이름으로 쓰고, 여러 요소에 같은 이름을 붙여 한꺼번에 스타일을 줄 수 있다. 
한 요소에 class를 여러 개 붙이는 것도 가능하다. 또한, id 선택자는 class 선택자보다 우선순위가 훨씬 높아서 id로 준 스타일은 class로 덮어쓰기 어렵다.

같은 스타일을 여러 곳에 재사용할 때는 class를 쓰고, 스타일은 대부분 class로 주는 게 관리하기 편하다. id는 페이지 내 위치 이동 링크, label과 input 연결처럼 유일한 대상을 가리킬 때 쓴다.

## 2. `margin`과 `padding`은 어떤 차이가 있나요? `box-sizing: border-box`를 사용하면 무엇이 달라질까요?

padding은 콘텐츠와 테두리 사이의 안쪽 여백으로, 요소의 일부라서 배경색이 칠해진다.
margin은 테두리 바깥의 바깥쪽 여백으로, 다른 요소와의 간격을 만들고 배경색이 칠해지지 않는다.
예를 들어 버튼 안 글자와 테두리 사이를 넓히려면 padding, 버튼과 옆 버튼 사이를 띄우려면 margin을 쓴다.

기본값 content-box에서는 width가 콘텐츠 영역만의 너비라서, width 200px에 padding 20px, border 2px을 주면 실제 너비가 244px이 된다. border-box를 쓰면 width 안에 padding과 border가 포함되어 200px로 유지된다.
또한, border-box를 쓰면 padding이나 border를 바꿔도 전체 크기가 변하지 않아서 레이아웃 계산이 쉬워진다.

## Flexbox 정리

### Flex Container와 Flex Item

display: flex를 준 부모 요소가 Flex Container, 그 바로 아래 자식 요소들이 Flex Item이다. 정렬 속성은 대부분 컨테이너에 준다.

### Main Axis(주축)와 Cross Axis(교차축)

주축은 아이템이 나열되는 방향이고, 교차축은 그와 수직인 방향이다. 기본은 주축이 가로, 교차축이 세로다. Flexbox의 정렬은 모두 이 두 축을 기준으로 동작한다.

### `display: flex`

요소를 Flex Container로 만든다. 자식 요소들이 기본적으로 한 줄에 가로로 나열된다.

### `flex-direction`

주축의 방향을 정한다. row는 가로(기본값), column은 세로이고, row-reverse와 column-reverse는 반대 방향이다. 방향을 바꾸면 주축과 교차축이 서로 바뀐다.

### `justify-content`

주축 방향으로 아이템을 정렬한다. flex-start는 시작점(기본값), center는 가운데, flex-end는 끝점, space-between은 양 끝에 붙이고 사이 간격을 균등하게, space-around와 space-evenly는 아이템 주변 간격을 균등하게 나눈다.

### `align-items`

교차축 방향으로 아이템을 정렬한다. stretch는 꽉 채우기(기본값)이고, flex-start, center, flex-end는 각각 시작, 가운데, 끝 정렬이다.
flex-direction이 row면 justify-content가 가로, align-items가 세로 정렬을 맡는다. column으로 바꾸면 반대로 justify-content가 세로, align-items가 가로 정렬을 맡는다.

### `gap`

아이템 사이의 간격을 정한다. 각 아이템에 margin을 주는 것보다 간단하고, 바깥쪽 끝에는 간격이 생기지 않는다.

### `flex-wrap`

아이템이 한 줄에 다 안 들어갈 때 줄바꿈 여부를 정한다. nowrap(기본값)은 한 줄에 우겨넣어 아이템이 줄어들고, wrap은 넘치는 아이템을 다음 줄로 넘긴다. 상품 카드 목록처럼 여러 줄로 배치할 때 쓴다.

## 추가 학습 정리
