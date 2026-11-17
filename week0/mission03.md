# Mission 03 - JavaScript

## 1. JavaScript에서 `let`과 `const`의 차이점은 무엇인가요? `const`로 선언한 객체의 속성도 변경할 수 없을까요?

let은 선언한 뒤에 새로운 값을 재할당할 수 있고, const는 선언할 때 반드시 값을 넣어야 하며 이후 재할당할 수 없다.

const로 선언한 객체나 배열의 내부 값은 변경할 수 있다. const가 막는 것은 재할당이지 객체 내용 변경이 아니기 때문이다. 예를 들어 product.price = 15000은 되지만 product = {}는 오류가 난다.

## 2. 배열의 `map()`, `filter()`, `find()`는 각각 어떤 역할을 하며, 반환하는 결과는 어떻게 다른가요?

map은 모든 요소를 변환해서 같은 길이의 새 배열을 반환한다.
filter는 조건이 true인 요소만 모아서 새 배열을 반환한다. 조건에 맞는 요소가 없으면 빈 배열을 반환한다.
find는 조건이 true인 첫 번째 요소 하나만 반환한다. 배열이 아니라 요소 자체이고, 없으면 undefined를 반환한다.

## 3. 구조 분해 할당(Destructuring)은 무엇이며, 어떤 상황에서 활용할 수 있나요?

구조 분해 할당은 배열이나 객체에서 필요한 값을 꺼내 변수에 한 번에 할당하는 문법이다. 이를 사용하면 코드가 짧아지고 읽기 쉬워진다. React에서 props에서 값을 꺼낼 때나 useState의 [값, 변경 함수]를 꺼낼 때 자주 쓴다.

## 직접 학습 정리

### 배열 메서드 실습

```js
const products = [
  { id: 1, name: "티셔츠", price: 20000 },
  { id: 2, name: "청바지", price: 45000 },
  { id: 3, name: "운동화", price: 78000 },
];
```

1. 모든 상품의 이름만 추출하기 (map)

```js
const names = products.map((product) => product.name);
console.log(names);
// ["티셔츠", "청바지", "운동화"]
```

2. 50000원 이하 상품만 찾기 (filter)

```js
const cheapProducts = products.filter((product) => product.price <= 50000);
console.log(cheapProducts);
// [{ id: 1, name: "티셔츠", price: 20000 }, { id: 2, name: "청바지", price: 45000 }]
```

3. id가 2인 상품 찾기 (find)

```js
const target = products.find((product) => product.id === 2);
console.log(target);
// { id: 2, name: "청바지", price: 45000 }
```

### 구조 분해 할당 (배열 vs 객체)

객체 구조 분해는 속성 이름을 기준으로 값을 꺼낸다. 그래서 순서는 상관없고, 변수 이름이 속성 이름과 같아야 한다. 다른 이름을 쓰고 싶으면 콜론으로 바꿀 수 있다.

배열 구조 분해는 순서(인덱스)를 기준으로 값을 꺼낸다. 그래서 변수 이름은 자유롭게 정할 수 있지만 순서가 중요하다.

## 추가 학습 정리
