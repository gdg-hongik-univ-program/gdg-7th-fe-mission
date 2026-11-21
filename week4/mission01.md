# Week4 Mission01 - Refactoring과 Custom Hook

## 1. Refactoring의 의미와 필요성

### 의미
**리팩터링(Refactoring)** 은 프로그램이 **하는 일(겉으로 보이는 동작)은 그대로 두고**, 코드의 **구조만 더 읽기 쉽고 고치기 쉽게** 바꾸는 작업이다.

- 버그 수정이나 새 기능 추가는 리팩터링이 아니다. (동작이 바뀌기 때문)
- 예: 긴 함수를 작은 함수로 나누기, 이름을 알아보기 쉽게 바꾸기, 여러 곳에 복붙된 코드를 하나로 모으기

### 필요성
| 문제 | 리팩터링하면 |
| --- | --- |
| 같은 코드가 여러 곳에 복붙되어 있음 | 한 곳만 고치면 모든 곳에 반영된다 |
| 컴포넌트 하나가 너무 많은 일을 함 | 역할별로 나눠서 읽기 쉬워진다 |
| 변수/함수 이름만 보고는 뭘 하는지 모름 | 코드를 처음 보는 사람(미래의 나 포함)도 이해하기 쉽다 |
| 새 기능을 넣을 때 어디를 고쳐야 할지 모름 | 구조가 정리되어 기능 추가와 버그 수정이 빨라진다 |

> 핵심: **"동작은 그대로, 코드는 더 좋게"**. 그래서 리팩터링 전후로 화면에서 똑같이 동작하는지 꼭 확인해야 한다.

---

## 2. Custom Hook의 개념과 사용 목적

### 개념
**Custom Hook** 은 `useState`, `useEffect` 같은 **React Hook을 사용하는 로직을 함수로 묶어서 재사용**할 수 있게 만든 것이다.

- 이름이 반드시 **`use`로 시작**해야 한다. (예: `useProducts`, `useNumberInput`)
- 컴포넌트처럼 **함수 안에서 다른 Hook을 호출**할 수 있다.
- 화면(JSX)을 반환하지 않고, **상태 값과 함수**를 반환한다.

```jsx
// 아주 간단한 예시
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((prev) => !prev);
  return [on, toggle];
}

// 사용
const [isOpen, toggleOpen] = useToggle();
```

### 사용 목적
1. **상태 로직 재사용**: 여러 컴포넌트에서 똑같이 쓰는 `useState + useEffect` 묶음을 한 번만 작성한다.
2. **컴포넌트를 깔끔하게**: 컴포넌트에는 "화면을 어떻게 그릴지"만 남기고, "데이터를 어떻게 다룰지"는 Hook으로 뺀다.
3. **관심사 분리**: 데이터 불러오기, 입력값 처리 같은 로직을 따로 관리하니 테스트와 수정이 쉬워진다.

> 주의: Custom Hook은 **상태를 공유하지 않는다.** 두 컴포넌트에서 같은 Hook을 호출하면 각자 따로 상태를 가진다. (로직을 공유하는 것이지, 데이터를 공유하는 게 아니다.)

---

## 3. 일반 함수와 Custom Hook의 차이점

| 구분 | 일반 함수 | Custom Hook |
| --- | --- | --- |
| 이름 규칙 | 자유 (`formatPrice`, `getTotal`) | 반드시 `use`로 시작 (`useProducts`) |
| 내부에서 Hook 사용 | ❌ 불가 (`useState`, `useEffect` 호출하면 규칙 위반) | ⭕ 가능 |
| 호출할 수 있는 곳 | 어디서든 (컴포넌트, 이벤트 핸들러, 다른 파일 등) | **컴포넌트 최상단** 또는 다른 Custom Hook 안에서만 |
| 조건문/반복문 안 호출 | 가능 | ❌ 불가 (Hook 규칙: 항상 같은 순서로 호출돼야 함) |
| 값 기억 | 호출할 때마다 새로 계산하고 끝 | 리렌더링 사이에도 **상태를 기억**하고, 상태가 바뀌면 화면이 다시 그려짐 |
| 주로 하는 일 | 계산, 변환 (값 → 값) | 상태 + 부수효과(데이터 불러오기 등) 관리 |

```jsx
// 일반 함수: 상태 없이 계산만 함
function onlyNumber(value) {
  return value.replace(/[^0-9]/g, '');
}

// Custom Hook: 상태를 가지고 있음
function useNumberInput() {
  const [value, setValue] = useState('');
  const onChange = (e) => setValue(onlyNumber(e.target.value));
  return { value, onChange, setValue };
}
```

> 정리: **상태(useState)나 생명주기(useEffect)가 필요하면 Custom Hook**, 단순 계산이면 **일반 함수**로 충분하다.

---

## 4. 쇼핑몰 코드에서 리팩터링 / Custom Hook을 활용할 수 있는 사례

### 사례: 숫자만 입력받는 input → `useNumberInput`

#### 현재 문제
숫자만 입력받는 코드 `e.target.value.replace(/[^0-9]/g, '')` 가 여러 파일에 **복붙**되어 있다.

- `pages/AdminPage.jsx`: 가격, 수량, 재고 수량 (3군데)
- `pages/PricePage.jsx`: 최소 가격, 최대 가격 (2군데)
- `components/Item.jsx`: 장바구니 개수

```jsx
// AdminPage.jsx (현재)
const [price, setPrice] = useState('');
const [quantity, setQuantity] = useState('');
...
<input value={price} onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))} />
<input value={quantity} onChange={(e) => setQuantity(e.target.value.replace(/[^0-9]/g, ''))} />
```

만약 "소수점도 허용하자"처럼 규칙이 바뀌면 **6군데를 모두 찾아서 고쳐야** 하고, 하나라도 빠뜨리면 버그가 된다.

#### 개선 방법
`src/hooks/useNumberInput.js` 를 만들어서 로직을 한 곳으로 모은다.

```jsx
// src/hooks/useNumberInput.js
import { useState } from 'react';

export default function useNumberInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value.replace(/[^0-9]/g, ''));
  };

  const reset = () => setValue('');

  return { value, onChange, reset };
}
```

```jsx
// AdminPage.jsx (개선 후)
const price = useNumberInput();
const quantity = useNumberInput();
...
<input value={price.value} onChange={price.onChange} />
<input value={quantity.value} onChange={quantity.onChange} />

// 등록 성공 후 입력칸 비우기
price.reset();
quantity.reset();
```

#### 좋아지는 점
- 숫자 입력 규칙이 바뀌어도 **`useNumberInput.js` 한 파일만** 고치면 된다.
- 컴포넌트 코드가 짧아지고, `price.onChange` 만 보고도 "숫자 입력칸"이라는 게 드러난다.
- 입력칸 비우기(`reset`) 같은 기능도 한 번 만들어 두면 모든 곳에서 쓸 수 있다.
- 화면에서 보이는 동작은 똑같다. → **리팩터링**

### (추가로 생각해 본 것) 상품 목록 불러오기 → `useProducts`
`App.jsx` 에 `items`, `isLoading`, `isError` 상태와 `useEffect` 안의 `getProducts()` 호출이 섞여 있다. 이걸 `useProducts()` 로 빼면 `App.jsx` 는 라우팅과 화면 구성만 담당하게 되어 더 읽기 쉬워진다.

```jsx
// App.jsx (개선 후)
const { items, isLoading, isError } = useProducts();
```
