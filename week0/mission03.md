# 질문 답변

## 1. JavaScript에서 `let`과 `const`의 차이점은 무엇인가요? `const`로 선언한 객체의 속성도 변경할 수 없을까요?
`let`은 변수에 새로운 값을 재할당할 수 있지만, `const`는 선언할 때 값을 할당해야 하고, 재할당할 수 없다. 
`const`로 선언한 객체의 내부 속성은 변경할 수 있다!
## 2. 배열의 `map()`, `filter()`, `find()`는 각각 어떤 역할을 하며, 반환하는 결과는 어떻게 다른가요?
- `map()`: 각 항목을 변환해서 항목 수는 그대로이고 값만 바뀐 새 배열을 만든다.
- `filter()`: 함수가 true를 돌려주는 항목만 남긴 새 배열을 만든다.
- `find()`: 조건에 맞는 첫 번째 항목 하나를 돌려준다.

`map`과 `filter`는 배열을 반환하는데, `find`는 객체를 반환한다. 

## 3. 구조 분해 할당(Destructuring)은 무엇이며, 어떤 상황에서 활용할 수 있나요?
구조 분해 할당은 배열이나 객체에서 필요한 값을 변수에 할당해서 쓰는 방법이다. 

구조 분해 할당은 값을 여러 번 쓸 때 코드를 짧게 하기 위해서 쓰고, 가독성을 높일 수 있다. React에서 props를 받을 때 가장 많이 쓰인다고 한다. 

# 핵심 키워드 정리(파란글씨만)

## 변수와 자료형 직접 알아보기
- 차이점: `let`은 재할당이 가능하나, `const`는 재할당이 안된다. 

`let`은 값이 바뀌는 변수(카운터, 반복문 변수 등)에 쓴다. 
`const`는 변수가 다른 값을 가리키는 것을 막지만, 객체나 배열 **내부 변경**까지 막지는 않는다. 

- 공톹 특징:  둘 다 선언한 `{ }` 블록 안에서만 쓸 수 있다. 

`var`은 의도치 않은 버그가 잘 생겨서 지금은 잘 쓰지 않는다고 한다. 

## 배열 메서드 직접 학습하기

배열에는 데이터를 효율적으로 처리하기 위한 다양한 메서드가 존재한다.  

```JavaScript
const products = [
  { id: 1, name: "티셔츠", price: 20000 },
  { id: 2, name: "청바지", price: 45000 },
  { id: 3, name: "운동화", price: 78000 },
];
```
#### `map()`
 각 항목을 변환해서 항목 수는 그대로이고 값만 바뀐 새 배열을 만든다. 
 
 원본 배열은 바뀌지 않는다. 
 ```JavaScript
const names = products.map((p) => p.name);
console.log(names); 
```
이름만 뽑아서 새 배열을 만든 것이다. 

 #### `filter()`
 함수가 `true`를 돌려주는 항목만 남긴 새 배열을 만든다. 
 
 맞는게 없으면 빈 배열 []을 돌려준다. 
 
 목록에서 검색, 필터링, 삭제할 때 많이 쓴다. 
 ```JavaScript
 const cheap = products.filter((p) => p.price < 50000);
console.log(cheap);
```
5만원 미만인 상품 2개만 담긴 새 배열이다. 

#### `find()`
조건에 맞는 첫 번째 항목 하나를 돌려준다. 

없으면 `undefined`이다. 

`id`로 특정 항목을 찾을 때 많이 쓴다. 

```JavaScript
const item = products.find((p) => p.id === 3);
console.log(item); 
```
배열이 아니라 객체 하나를 돌려준다. id가 3인 항목을 찾아준다. 

#### `forEach()`
아무것도 돌려주지 않는다(`undefined`).

출력, 저장 같은 "할 일"을 실행할 때 쓴다. 
```JavaScript
products.forEach((p) => {
  console.log(`${p.name}: ${p.price}원`);
});
```
출력만 하고 결과는 돌려주지 않는다. 

네 가지 모두 원본 배열 자체를 바꾸지 않는다. 
`map`과 `filter`는 항상 새로운 배열을 만들고, `find`는 요소 하나를 돌려준다. 그리고 `forEach`는 결과가 없다.

## 구조 분해 할당 직접 학습하기

구조 분해 할당은 배열이나 객체에서 필요한 값을 꺼내 변수에 할당하는 문법이다. 

```js
const product = {
  name: "티셔츠",
  price: 20000,
};
```
---
#### 기본 개념
구조 분해 없이 값을 꺼내면 이렇게 반복해서 써야 된다. 
```js
const name = product.name;
const price = product.price;
```

구조 분해 할당을 쓰면 한 줄로 줄어든다.
```js
const { name, price } = product;

console.log(name);    // "티셔츠"
console.log(price);   // 20000
```
---
#### 객체 구조 분해
```js
const { name, price } = product;
```
중괄호 `{ }`, "속성 이름"으로 꺼낸다. 

순서를 바꿔도 결과는 같다. 

변수 이름은 속성 이름과 같아야 하는데, 다른 이름으로 쓰려면 `속성: 새이름`으로 쓴다. 

---
#### 배열 구조 분해
같은 상품 구조를 배열로 표현하면 다음과 같다. 

```js
const productArr = ["티셔츠", 20000];

const [name, price] = productArr;

console.log(name);    // "티셔츠"
console.log(price);   // 20000
```
대괄호`[ ]`, "순서"로 꺼낸다. 

인덱스 순서 대로 값이 들어가고, 변수 이름을 마음대로 지을 수 있다. 
```js
const [title, cost] = productArr;   // 이름이 달라도 순서로 매칭됨
```
---

#### 객체 VS 배열 차이점

- 괄호: `{ }` vs `[ ]`
- 값을 찾는 기준: 속성 이름 vs 순서(위치)
- 변수 이름: 속성 이름과 같아야 함 vs 자유롭게 지을 수 있음
- 순서: 영향 없음 vs 값이 달라짐 

```js
const { name, price } = product;          // 이름으로 찾음: name → "티셔츠"
const [name, price] = ["티셔츠", 20000];   // 순서로 찾음: 첫 번째 → name
```
---

#### 구조 분해를 쓰는 이유
- 코드가 짧아진다
- 읽기 쉽다: 어떤 값을 쓰는지 맨 위에서 한눈에 보인다. 
- 한번에 여러 값을 꺼낸다
- 기본값을 쉽게 준다
- 변수 값 교환이 간단하다

## JavaScript 추가 개념

### Truthy/Falsy
조건문(if)이나 `&&`에서 참 또는 거짓으로 취급되는 값

- Falsy(거짓 취급) 8개: `false`, `0`, `-0`, `0n`, `""`(빈 문자열), `null`, `undefined`, `NaN`
- 그 외는 모두 Truthy: `"0"`, `[]`, `{}`도 참이다. 
---

# 핵심 키워드 정리(전체 요약)

## JavaScript란?
JavaScript(JS)는 웹페이지에 동적인 기능을 추가하고 데이터를 처리할 수 있는 프로그래밍 언어이다. 

쇼핑몰에 다음과 같은 기능을 JS를 통해 사용가능하다
- 상품 목록과 가격 데이터 관리
- 장바구니에 상품 추가 또는 삭제
- 상품 가격 계산
- 검색 조건에 맞는 상품 표시

`console.log()`: 값을 콘솔에 출력하는 함수
```html
<script src="./script.js" defer></script>
```
HTML문서에 외부 JS파일을 연결 할 수 있다.

## 변수와 자료형

### 변수
변수는 프로그램에서 사용하는 값을 저장하고 참조하기 위한 이름이다. 
- `let`: 변수에 새로운 값을 재할당할 수 있다. 
- `const`: 선언할 때 값을 할당해야 하며, 이후 재할당할 수 없다/. 

### 직접 알아보기
- 차이점: `let`은 재할당이 가능하나, `const`는 재할당이 안된다. 

`let`은 값이 바뀌는 변수(카운터, 반복문 변수 등)에 쓴다. 
`const`는 변수가 다른 값을 가리키는 것을 막지만, 객체나 배열 **내부 변경**까지 막지는 않는다. 

- 공톹 특징:  둘 다 선언한 `{ }` 블록 안에서만 쓸 수 있다. 

`var`은 의도치 않은 버그가 잘 생겨서 지금은 잘 쓰지 않는다고 한다. 

### 자료형
- `string`: 문자열
- `number`: 숫자
- `boolean`: 참 또는 거짓
- `undefined`: 값 할당 안된 상태 등을 나타내는 값

`typedef`연산자로 값의 자료형을 확인할 수 있다. 

- 원시타입: 문자열, 숫자, 불리언 등
- 객체타입: 객체, 배열, 함수 등

## 연산자와 제어문

연산자를 이용해 값을 계산하거나 비교할 수 있다
- `+`, `-`, `>`, `==`, `=` 등등

특정 조건에 따라 다른 코드를 실행할 때 조건문을 쓸 수 있다. 
- `if`, `else`, `else if` 등

반복문은 비슷한 작업을 여러번 실행할 때 사용한다.
- `for ...of`문도 있다.

## 함수
함수는 특정 작업을 수행하는 코드를 하나로 묶어 재사용할 수 있도록 도와준다. 

```js
function calculateTotal(price, quantity) {
  return price * quantity;
}

const total = calculateTotal(20000, 3);

console.log(total); // 60000
```
### 화살표 함수
```js
function add(a, b) {
  return a + b;
}
```
이 함수를
```js
const add = (a, b) => a + b;
``` 
이렇게 줄일 수 있다. 

### 콜백 함수
Js에서는 함수를 다른 함수의 인자로 전달할 수 있는데 이처럼 다른 함수에 전달되어 호출되는 함수를 콜백 함수라고 한다. 


## 배열과 객체

### 배열
배열은 여러 개의 값을 순서대로 저장할 수 있는 자료구조이다. 

```javaScript
const products = ["티셔츠", "청바지", "운동화"];

console.log(products[0]);     // "티셔츠"
console.log(products.length); // 3
```
배열은 0부터 시작하는 인덱스를 통해 각 요소에 접근할 수 있다. 

### 객체
객체는 여러 데이터를 키(key)와 값(value)의 형태로 표현할 수 있다. 
```javaScript
const product = {
  id: 1,
  name: "티셔츠",
  price: 20000,
};
```

### 배열 메서드 직접 학습하기
배열에는 데이터를 효율적으로 처리하기 위한 다양한 메서드가 존재한다.  

```JavaScript
const products = [
  { id: 1, name: "티셔츠", price: 20000 },
  { id: 2, name: "청바지", price: 45000 },
  { id: 3, name: "운동화", price: 78000 },
];
```
#### `map()`
 각 항목을 변환해서 항목 수는 그대로이고 값만 바뀐 새 배열을 만든다. 
 
 원본 배열은 바뀌지 않는다. 
 ```JavaScript
const names = products.map((p) => p.name);
console.log(names); 
```
이름만 뽑아서 새 배열을 만든 것이다. 

 #### `filter()`
 함수가 `true`를 돌려주는 항목만 남긴 새 배열을 만든다. 
 
 맞는게 없으면 빈 배열 []을 돌려준다. 
 
 목록에서 검색, 필터링, 삭제할 때 많이 쓴다. 
 ```JavaScript
 const cheap = products.filter((p) => p.price < 50000);
console.log(cheap);
```
5만원 미만인 상품 2개만 담긴 새 배열이다. 

#### `find()`
조건에 맞는 첫 번째 항목 하나를 돌려준다. 

없으면 `undefined`이다. 

`id`로 특정 항목을 찾을 때 많이 쓴다. 

```JavaScript
const item = products.find((p) => p.id === 3);
console.log(item); 
```
배열이 아니라 객체 하나를 돌려준다. id가 3인 항목을 찾아준다. 

#### `forEach()`
아무것도 돌려주지 않는다(`undefined`).

출력, 저장 같은 "할 일"을 실행할 때 쓴다. 
```JavaScript
products.forEach((p) => {
  console.log(`${p.name}: ${p.price}원`);
});
```
출력만 하고 결과는 돌려주지 않는다. 

네 가지 모두 원본 배열 자체를 바꾸지 않는다. 
`map`과 `filter`는 항상 새로운 배열을 만들고, `find`는 요소 하나를 돌려준다. 그리고 `forEach`는 결과가 없다. 

## React에서 자주 사용하는 JavaScript 문법

### 템플릿 리터럴
백틱으로 문자열을 작성하는 방법이다. 
```js
const name = "티셔츠";
const price = 20000;

console.log(`${name}의 가격은 ${price}원입니다.`);
```

### 삼항 연산자
조건에 따라 다른값을 반환할 때 사용한다. 
- 형태: `조건 ? 참일 때 값 : 거짓일 때 값`

### 구조 분해 할당 직접 학습하기
구조 분해 할당은 배열이나 객체에서 필요한 값을 꺼내 변수에 할당하는 문법이다. 

```js
const product = {
  name: "티셔츠",
  price: 20000,
};
```
---
#### 기본 개념
구조 분해 없이 값을 꺼내면 이렇게 반복해서 써야 된다. 
```js
const name = product.name;
const price = product.price;
```

구조 분해 할당을 쓰면 한 줄로 줄어든다.
```js
const { name, price } = product;

console.log(name);    // "티셔츠"
console.log(price);   // 20000
```
---
#### 객체 구조 분해
```js
const { name, price } = product;
```
중괄호 `{ }`, "속성 이름"으로 꺼낸다. 

순서를 바꿔도 결과는 같다. 

변수 이름은 속성 이름과 같아야 하는데, 다른 이름으로 쓰려면 `속성: 새이름`으로 쓴다. 

---
#### 배열 구조 분해
같은 상품 구조를 배열로 표현하면 다음과 같다. 

```js
const productArr = ["티셔츠", 20000];

const [name, price] = productArr;

console.log(name);    // "티셔츠"
console.log(price);   // 20000
```
대괄호`[ ]`, "순서"로 꺼낸다. 

인덱스 순서 대로 값이 들어가고, 변수 이름을 마음대로 지을 수 있다. 
```js
const [title, cost] = productArr;   // 이름이 달라도 순서로 매칭됨
```
---

#### 객체 VS 배열 차이점

- 괄호: `{ }` vs `[ ]`
- 값을 찾는 기준: 속성 이름 vs 순서(위치)
- 변수 이름: 속성 이름과 같아야 함 vs 자유롭게 지을 수 있음
- 순서: 영향 없음 vs 값이 달라짐 

```js
const { name, price } = product;          // 이름으로 찾음: name → "티셔츠"
const [name, price] = ["티셔츠", 20000];   // 순서로 찾음: 첫 번째 → name
```
---

#### 구조 분해를 쓰는 이유
- 코드가 짧아진다
- 읽기 쉽다: 어떤 값을 쓰는지 맨 위에서 한눈에 보인다. 
- 한번에 여러 값을 꺼낸다
- 기본값을 쉽게 준다
- 변수 값 교환이 간단하다

### 전개 구문
전개 구문은 `...`을 사용해 배열의 요소나 객체의 속성을 펼치는 문법이다. 

```js
const oldProducts = ["티셔츠", "청바지"];

const newProducts = [...oldProducts, "운동화"];

console.log(newProducts);
// ["티셔츠", "청바지", "운동화"]
```
객체에도 사용할 수 있다. 

### import와 export
`export`로 다른 파일에서 사용할 값을 내보내고, `import`로 해당 값을 가져온다. 

## DOM과 Event

JavaScipt로 실제 웹페이지의 내용을 변경하려면 어떻게 해야 할까?

### DOM
브라우저가 HTML 문서를 객체 형태의 계층 구조로 표현한 것이다. 

```html
<h1 id="title">안녕하세요!</h1>
```
```js
const title = document.querySelector("#title");

title.textContent = "제목이 변경되었어요!";
```
`id`가 `title`인 요소를 찾아 텍스트 내용을 변경한다. 

- `getElementById()`: ID로 요소 찾기
- `querySelector()`: CSS 선택자로 첫 번째 요소 찾기
- `querySelectorAll()`: CSS 선택자와 일치하는 모든 요소 찾기
- `textContent`: 요소의 텍스트 읽기, 변경
- `classList`: 요소의 클래스 추가, 제거, 전환

### Event
이벤트는 클릭, 키보드 입력 등 웹페이지에서 발생하는 동작을 의미한다. 

```html
<button id="like-button">좋아요</button>
```
```js
const button = document.querySelector("#like-button");

button.addEventListener("click", () => {
  console.log("좋아요 버튼을 클릭했어요!");
});
```
클릭 이벤트가 발생하면 실행된다. 

React에서는 DOM을 직접 조작하기보다는 상태(State)의 변화에 따라 UI를 렌더링하는 방식을 사용한다. 

### 직접 알아보기

#### Truthy/Falsy
조건문(if)이나 `&&`에서 참 또는 거짓으로 취급되는 값

- Falsy(거짓 취급) 8개: `false`, `0`, `-0`, `0n`, `""`(빈 문자열), `null`, `undefined`, `NaN`
- 그 외는 모두 Truthy: `"0"`, `[]`, `{}`도 참이다. 
---

#### Scope
변수에 접근할 수 있는 범위

- 전역: 어디서나 접근
- 함수 안, 블록 안에서만 접근
---

#### Hoisting
선언이 코드 실행 전에 위로 끌어올려진 것처럼 동작하는 현상

---

#### this
함수가 어떻게 호출되느냐에 따라 달라지는 참조 값

---

#### reduce
배열을 돌면서 하나의 값으로 누적하는 메서드

합계, 개수 세기, 배열을 객체로 바꾸기 등에 쓴다.

---

### class
객체를 만드는 설계도 문법

`extends`로 상속도 가능하다

---

#### Promise
지금은 결과가 없지만 나중에 완료될 작업을 나타내는 객체이다. 

상태: 대기, 성공, 실패

---

#### async / await
Promise를 동기 코드처럼 읽기 쉽게 쓰는 문법이다. 

- `async`: 이 함수가 Promise를 돌려준다는 표시
- `await`: Promise가 끝날 때까지 기다렸다가 결과를 받음(`async`함수 안에서만 사용)
