# 질문 답변

## 1. CSS의 `id` 선택자와 `class` 선택자는 어떻게 다르며, 각각 어떤 상황에서 사용하는 것이 좋을까요?
`id`선택자는 페이지에서 딱 하나 뿐인 요소를 가리키고, `class`선택자는 여러 요소를 묶어서 가리킨다. 

`id`는 한 페이지에 하나라 특정 위치로 이동하고 할 때 좋지만, 우선순위가 높아서 스타일을 덮어쓰기 번거로워서 우선순위가 낮고 재사용하기 좋은 `class`를 기본으로 사용하는 것이 좋다. 

### 2. `margin`과 `padding`은 어떤 차이가 있나요? `box-sizing: border-box`를 사용하면 무엇이 달라질까요? 
`margin`은 요소 바깥쪽 공간을, `padding`은 요소 내부의 공간을 조절한다. 
`box-sizing: border-box`를 사용하면 `width`가 Padding과 Border를 포함하도록 계산하는데 기본값인 `box-sizing: content-box`에서는 `width`가 콘텐츠 영역의 너비를 의미해서 너비가 달라지게 된다. 


# 핵심 키워드 정리

## CSS란?
CSS란 HTML로 작성한 웹페이지의 디자인과 레이아웃을 지정하는 언어이다. 

- 기본 구성: 선택자(Selector), 속성(Property), 값(Value)으로 구성

```css
p {
  color: blue;
  font-size: 16px;
}
```
- `p`: 스타일을 적용할 대상인 <b>선택자</b>
- `color`, `front-size`: 변경할 스타일 <b>속성</b>
- `blue`, `16px`: 속성에 적용할 <b>값</b>

### 적용
- 외부 스타일 시트:  CSS를 별도 파일로 만들어서 `<link>` 로 연결한다
```css
<link rel="stylesheet" href="style.css" />
```
- 내부 스타일 시트: HTML의 `style`태그 안에 작성한다. 
- 인라인 스타일: 태그의 `style`속성에 바로 적는다. 

## CSS 선택자(Selector)
### 태그
`p`: 해당 태그를 가진 요소에 적용한다. 
### 클래스
`.description`: 같은 클래스를 가진 여러 요소에 적용 하능하다.
### ID
`#notice`: 고유한 ID를 가진 요소에 적용한다. 

### CSS 우선순위
ID 선택자 > 클래스 선택자 > 태그 선택자

선택자의 우선순위가 같아면 일반적으로 나중에 작성된 스타일이 적용된다. 

### CSS 주요 속성
`color`, `background-color`, `font-size`, `font-weight`(글자 두께), `width`, `height`, `border`(테두리), `margin`(요소 바깥쪽 여백), `padding`(요소 안쪽 여백) 등이 있다. 

## 박스 모델
- Content: 텍스트나 이미지 등 실제 콘텐츠
- Padding: 콘텐츠와 테두리 사이의 여백
- Border: 요소의 테두리
- Margin: 요소 바깜쪽의 여백

`margin`은 요소 바깥쪽 공간을, `padding`은 요소 내부의 공간을 조절한다!

기본값 `box-sizing: context-box`에서는 `width`가 콘텐츠 영역의 너비를 의미하는데, `border-box`는 설정한 `width`안에 Padding과 Border를 포함해 계신히더럭 힌디. 

## display와 레이아웃
HTML 요소는 CSS의 `display`속성에 따라 화면에 배치되는 방식이 달라진다. 

- `block`: 기본적으로 새로운 줄에서 시작하며 사용 가능한 너비를 차지함(`<div>`)
- `inline`: 텍스트처럼 한줄에 배치되며 `width`, `height`가 직접 적용되지 않음(`<span>`)
- `inline-block`: 한 줄에 배치되면서 너비와 높이도 설정 가능함

## Flexbox
Flexbox는 웹페이지에서 여러 요소를 효율적으로 정렬하고 배치할 수 있도록 도와주는 CSS 레이아웃 방식이다. 

한 줄 또는 한 열에서 쉽게 배치하고 정렬할 수 있게 해주는 것 같다. 

또 가로로 나란히 높기, 가운데 정렬, 간격 맞추기를 몇 줄로 해결할 수 있다. 

### Flex Container와 Flex Item

| 용어 | 뜻 | 예시 |
|---|---|---|
| Flex Container | `display: flex`를 준 **부모 요소** | `.container` |
| Flex Item | 컨테이너의 **직계 자식 요소** | `.item` |

```html
<div class="container">   <!-- Flex Container -->
  <div class="item">1</div>   <!-- Flex Item -->
  <div class="item">2</div>   <!-- Flex Item -->
  <div class="item">3</div>   <!-- Flex Item -->
</div>
```
- 배치 설정은 **부모(컨테이너)** 에 하고, 실제로 배치되는 것은 **자식(아이템)** 이다.
- 아이템은 **직계 자식만** 해당한다. 손자 요소는 아이템이 아니다.

### Main Axis(주축)와 Cross Axis(교차축)

- 주축(main axis): 아이템이 늘어서는 방향이다. 기본은 가로이다.

- 교차축(cross axis): 주축과 수직인 방향이다. 기본은 세로이다. 

### `dispaly: flex`
부모에 `display: flex`를 주면 그 요소가 Flex Container가 되고, 자식들이 **가로로 나란히** 놓인다.

```css
.container {
  display: flex;
}
```

### `flex-direction`으로 주축 방향 바꾸기
주축의 방향을 정할 수 있다. 

- row: 기본 방향이고 가로로 왼쪽에서 오른쪽이다. 
- row-reverse: 가로인데 역방향이다. 
- column: 세로이고 위->아래이다. 
- column-reverse: 세로인데 역방향이다. 

```css
.container {
  display: flex;
  flex-direction: column;   
}
```

`column`으로 바꾸면 주축이 세로, 교차축이 가로가 된다.

---

### `justify-content`
주축 방향으로 아이템을 정렬한다. 

- start: 시작 쪽으로 정렬한다. 
- center: 가운데로 정렬한다.  
- end: 끝쪽으로 정렬한다
- space-between: 양 끝에 붙이고 사이 간격을 균등하게 한다. 
- space-around: 양쪽 여백의 절반만큼을 나눠 갖고, 고르게 정렬한다. 
- space-evenly: 모든 간격을 균등하게 한다. 

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

### `align-items`
교차축 방향으로 아이템을 정렬한다. 
`align-items`는 좌우 값을 가지지 않는다. 

```css
.container {
  display: flex;
  justify-content: center;   
  align-items: center;       
  height: 100vh;             
}
```
위는 정중앙 배치이다. 

### gap
아이템 사이의 간격을 정한다. 바깥 여백은 만들지 않는다. 

행과 열 사이에 모두 간격을 준다. 
`<row-gap>`과 `<column-gap>`이 있다. 

```css
.container {
  display: flex;
  gap: 16px;            
}
```

### `flex-wrap`
아이템이 강제로 한 줄 안에 배치되게 할지, 아니면 줄바꿈을 해서 여러행으로 나눠 표현할지를 정한다. 

- nowrap: 기본 설정값으로 부모요소 영역을 벗어나더라도 한 줄에 배치한다. 
- wrap: 요소들이 내부로직에 의해 분할되어 여러 행에 걸쳐 배치한다. 
- wrap-reverse: 시작점과 끝점이 wrap과 반대로 배치된다. 
```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
```
개수가 많을 때 `wrap`을 쓰면 화면 크기에 맞춰 자동으로 줄이 바뀐다. 

## 추가로 알아둬야 할 CSS

### Position
요소의 위치를 저장하는 방법을 결정한다. 

- `static`: 기본 배치
- `relative`: 원래 위치 기준 상대적으로 이동
- `absolute`: 배치 흐름에서 벗어나 기준 요소를 중심으로 위치 지정
- `fixed`: 일반적으로 화면을 기준으로 위치 고정
- `sticky`: 스크롤 위치와 컨테이너에 따라 달라지는 배치

### Hover와 Transition

- `hover`: 마우스를 올렸을 때 바뀌는 가상 클래스
- `transition`: 바뀌는 과정이 서서히 진행되게 함

## 직접 알아보기

### CSS Grid
행과 열을 동시에 다루는 2차원 레이아웃 방식이다. 

부모(Grid Container)에 `display: grid`를 주고, 자식(Grid Item)들이 칸에 들어간다.

핵심 속성
- grid-template-columns: 열의 개수와 너비를 정한다. 
- grid-template-rows: 행의 개수와 너비를 정한다. 
- gap: 칸 사이 간격

fr 단위
- fr: 남은 공간을 비율로 나누는 단위

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  
  gap: 16px;
}
```
아이템이 3열짜리 격자에 들어가서, 한 줄에 3개씩 배치된다. 