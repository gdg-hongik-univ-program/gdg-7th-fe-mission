# 상태 관리

## 상태 관리의 개념과 필요성 정리하기

### 개념
**상태(state)는 시간이 지나면서 바뀌고, 바뀌면 화면도 따라 바뀌어야 하는 데이터**이다.  

**상태 관리**는 이런 상태를 **어디에 두고, 어떻게 바꾸고, 어떤 컴포넌트에게 어떻게 전달할지 정하는 것**이다.  

### 필요성
앱이 커질수록, state가 어떻게 구성되는지, 그리고 데이터가 컴포넌트 사이에서 어떻게 흐르는지 의도적으로 정하는 것이 도움이 된다.  
**불필요하거나 중복된 state는 버그의 흔한 원인이다.**  

상태 관리를 잘하면 좋은 점:
- 한 곳에서 관리하니까 어긋날 일이 없다. 
- 데이터가 어디서 와서 어디로 가는지 분명해진다. 
- 앱이 커져도 고치기 쉽다. 

### React가 제공하는 상태 관리 방법
1. `useState`: 컴포넌트 하나의 상태
2. State 끌어올리기: 여러 컴포넌트가 같이 쓰는 상태는 공통 부모로 올린다. 
3. `useReducer`: 상태를 바꾸는 로직이 복잡하면 한 함수(reducer)에 모은다. 
4. Context: 깊은 곳까지 props 없이 전달
5. Reducer + Context: 앱이 커지면 둘을 합쳐서 관리

## Props Drilling

### 개념
**자기는 쓰지도 않는 props를, 아래 컴포넌트에게 전달하기 위해 받아서 그대로 넘기는 것이 여러 단계 반복되는 것**이다.  

바로 아래 컴포넌트에 전달해야 되니 불필요하게 몇 단계씩 넘기려고 state를 멀리 있는 공통 부모까지 끌어올리는 상황 같은 것이다.  

### 문제점
- **코드가 길어지고 번거로워진다.**
    - 중간 컴포넌트마다 같은 props를 받고 넘기는 코드를 써야한다. 
- **하나만 빠트려도 에러가 난다.**
- **중간 컴포넌트가 상관없는 데이터에 묶인다.**
    - 구조가 바뀌면, 쓰지 않는 컴포넌트들까지 고쳐야 한다. 
- **단계가 깊어질수록 심해진다.**
    - 트리 맨 위에서 맨 아래 리프까지 많은 단계를 거치면 관리가 어려워진다.  


## Context와 `useContext`

### 개념
Context는 **부모 컴포넌트가 자기 아래 트리 전체에 데이터를 제공할 수 있게 해 주는 기능**이다.  
중간 컴포넌트가 몇 개든 거치지 않고, 아래에 있는 컴포넌트가 바로 꺼내 쓸 수가 있다.  

props는 하나씩 손으로 넘기는 느낌이고 Context는 와이파이 공유기 느낌이다.  

### 쓰는 법
1. 만들기: `createContext`
```js
import { createContext } from 'react';

export const LevelContext = createContext(1);   // 괄호 안은 기본값
```

2. 꺼내 쓰기: `useContext`
```js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);   // props 대신 Context에서 읽음
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
```

3. 제공하기: `<Context value={...}>`
```js
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
```
감싼 안 쪽 전체가 이 값을 쓸 수 있다.  

### `useContext`의 역할
- **가장 가까운** 위쪽 Provider가 준 값을 꺼내 온다. 그래서 Section이 여러 겹이면 바로 위 Section의 값을 쓴다. 
- 그 값이 바뀌면 `useContext`를 쓴 컴포넌트는 **자동으로 다시 렌더링**된다. 
- Provider가 없으면 `createContext`에 넣은 기본값을 쓴다. 
- Hook이니까 **컴포넌트 맨 위에서만** 불러야 한다.  

### Context의 특징
- **중간 컴포넌트를 통과한다.**
- **놓인 위치에 따라 다른 값을 받는다.**
- **여러 Context는 서로 영향을 주지 않는다.**

### 쓰임
- 테마: 다크모드
- 현재 계정: 로그인한 사용자 정보
- 라우팅: 대부분 라우팅 라이브러리가 내부적으로 Context로 지금 주소를 관리
- 상태 관리: Reducer와 함께 써서 복잡한 상태를 멀리 있는 컴포넌트로 전달

<br>
<br>
<br>
<br>
    
# 상태 관리 라이브러리

## Context라는 React 내장 기능이 있음에도 라이브러리를 사용하는 이유

1. **값이 바뀌면 그 Context를 쓰는 컴포넌트가 다 다시 렌더링된다.**
    - Context는 `value`객체 하나를 통째로 내려 줘서, 그 Context를 쓰는 컴포넌트가 하나 바뀌면 나머지도 다시 렌더링된다. 
2. **Context가 많아지면 관리가 어렵다.**
    - Context가 늘어나면 관리가 힘들어져서, 상태와 액션이 복잡해지면 전역 상태 라이브러리를 고려하는게 낫다. 
3. **준비 코드(보일러플레이트)가 많다.**
    - Context로 상태 관리를 하려면 `createContext` → Provider 컴포넌트 → `useState/useReducer` → 커스텀 Hook까지 만들어야 한다. 
4. **부가 기능이 있다.**
    - 새로고침해도 유지, 개발자 도구, 컴포넌트 밖에서 상태 읽기 같은 기능을 쓸 수 있다.  

|   |Context|상태 관리 라이브러리|
|---|---|---|
|설치|필요 없음|필요|
|리렌더링|value가 바뀌면 쓰는 컴포넌트 모두|구독한 값이 바뀔 때만|
|준비 코드|많음|적음|
|저장, 개발자 도구|직접 구현|기본 제공 또는 미들웨이|
|잘 맞는 곳|테마, 로그인 정보처럼 자주 안 바뀌는 값|자주 바뀌고 여러 곳에서 쓰는 값|

## 라이브러리

### 라이브러리 비교
|라이브러리|방식|특징|평가|
|---|---|---|---|
|**Redux**|스토어 하나+ 액션 + 리듀서|가장 오래되고 많이 씀, 규모 큰 앱에 강함|준비 코드가 많고 배우기 어려움->대규모 프로젝트용|
|**Zustand**|스토어 하나(간단)|Provider 없음, 짧은 코드|빠른 시작, 간단한 전역 상태에 추천|
|**Jotai**|아톰(작은 상태조각)들을 조합|Recoil과 비슷한데 더 가벼움|중간 규모, 세밀한 상태 관리|
|**Recoil**|아톰 + 셀렉터|메타(페이스북)가 만듦, `RecoilRoot`가 필요|실험적, 업데이트가 부족해 도입은 신중히 해야함|

## Zustand 특징 및 사용법

### 특징
- **작고 간단하다.** 
    - 작고, 빠르고, 확장 가능한 상태 관리이다. 
- **Provider가 필요 없다.** 
    - App을 감싸지 않아도 된다.
- **Hook으로 쓴다**. 
    - 스토어 자체가 Hook이라 `useStore(...)`처럼 바로 꺼내 쓴다.
- **셀렉터로 필요한 값만 구독한다.** 
    - 그 값이 바뀔 때만 다시 렌더링된다.
- **불변 상태 모델이다.** 
    - Redux처럼 값을 직접 고치지 않고 새 값으로 바꾼다.
- **미들웨어**
    - persist(저장), devtools, immer 등을 붙일 수 있다.


### 사용법

#### 설치
```bash
pnpm add zustand
```

#### 1. 스토어 만들기: `create`
```js
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))
```
- 상태(`bears`)와 그 상태를 바꾸는 함수(액션)를 **한 곳**에 같이 둔다. 
- `set`은 state를 바꾸는 함수이다. 넘긴 객체를 기존 상태에 합친다. 그래서 바꿀 값만 넣으면 나머지는 그대로이다. 
- `set((state) => ...)`: 이전 값을 받아서 계산할 때는 함수로 넘긴다. 

#### 2. 컴포넌트에서 쓰기: 셀렉터
```js
function BearCounter() {
  const bears = useBearStore((state) => state.bears)   // bears만 구독
  return <h1>{bears} bears around here...</h1>
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
```
- `(state) => state.bears`가 **셀렉터**이다. 필요한 값만 고른다. 
- `BearCounter`는 `bears`가 바뀔 때만 다시 렌더링된다. 
- Provider로 감싸지 않아도 어디서든 쓸 수 있다. 

#### 3. 여러 값을 한 번에 꺼낼 때: `useShallow`
```js
import { useShallow } from 'zustand/react/shallow'

const { nuts, honey } = useBearStore(
  useShallow((state) => ({ nuts: state.nuts, honey: state.honey })),
)
```
셀렉터가 **새 객체**를 만들어 돌려주면, 매번 "바뀌었다"고 판단해서 쓸데없이 다시 렌더링될 수 있다.  
`useShallow`로 감싸면 안의 값이 실제로 바뀔 때만 다시 그린다.  

#### 4. 새로고침해도 유지: `persist`
```js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    }),
    { name: 'bear-storage' },   // localStorage에 저장될 이름
  ),
)
```

## Zustand의 장단점

### 장점
- **배우기 쉽고 코드가 짧다.**
    - `create`하나로 상태와 액션을 정의한다. 
- **Provider가 없다.**
    - App을 감쌀 필요가 없고, Provider 중첩 문제가 없다. 
- **필요한 값만 구독해서 리렌더링이 적다.**
    - Context처럼 value가 바뀔 때 전부 다시 그리지 않는다. 
- **컴포넌트 밖에서도 쓸 수 있다.**
- **미들웨어가 있다.**
    - 저장(`persist`), 개발자 도구(`devtools`), 불변성 도우미(`immer`).
- **많이 쓰여서 자료가 많다.**

### 단점
- **아주 크고 복잡한 앱에는 덜 맞을 수 있다.**
    - 상태끼리 의존 관계가 복잡한 대규모 앱은 Redux Toolkit 쪽이 더 쳬계적이다. 
- **구조를 자유롭게 짤 수 있는 만큼, 팀 규칙이 필요하다.**
- **셀렉터를 잘못 쓰면 리렌더링이 많아진다.**
    - 새 객체를 돌려주는 셀렉터는 `useShallow`를 써야 한다. 
- **서버 데이터 관리 기능은 없다.**
    - 캐싱, 다시 불러오기 같은 건 React Query 같은 도구를 같이 써야 한다. 
- **공식 문서가 상대적으로 간단하다.**  


<br>
<br>
<br>
<br>

# 쇼핑몰 상태 관리 개선하기

## 문제점
지금 페이지 세 개가 장바구니를 쓰지도 않는데, `cart`, `onAddToCart`를 받아서 Item에 넘기기만 한다.  
-> Props Drilling이 일어난다.  
```
App  ← cart, handleAddToCart, handlePurchase 전부 여기
├─ Navbar
├─ CategoryPage  ← cart, onAddToCart 받아서 넘기기만 함
│   └─ Item      ← 실제로 쓰는 곳
├─ PricePage     ← 받아서 넘기기만 함
│   └─ Item
├─ SortPage      ← 받아서 넘기기만 함
│   └─ Item
└─ Footer        ← onPurchase 받음
```

장바구니(`cart`)와 담기, 비우기 함수를 전역으로 둔다. 

## Context를 써서 장바구니 상태 관리하기

### `src/contexts/` 폴더에 파일 2개 만들기
`src/contexts/CartContext.js`: 컨텍스트와 꺼내쓰는 훅
```js
import { createContext, useContext } from "react";

// 장바구니 Context
export const CartContext = createContext(null);

// 장바구니를 꺼내 쓰는 커스텀 Hook
export function useCart() {
  return useContext(CartContext);
}
```

`src/contexts/CartProvider.jsx`: 장바구니 state를 만들어서 아래로 내려주는 컴포넌트
```jsx
import { useState } from "react";
import { CartContext } from "./CartContext";

// 장바구니 상태를 만들고 아래 컴포넌트들에게 제공
export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // [{ id, count }, ...]

  // 장바구니에 담기 (이미 있으면 그대로)
  function addToCart(id, count) {
    setCart((prev) => {
      if (prev.some((item) => item.id === id)) return prev;
      return [...prev, { id, count }];
    });
  }

  // 장바구니 비우기 (구매 후)
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext>
  );
}
```
그 후 `main.jsx`에서 App을 `CartProvider`로 감싼다.

그리고 App에 있던 `cart` state와 `handleAddToCart` 함수를 지우고, 페이지와 Item에 넘기던 `cart`, `onAddToCart` props도 지운다.  
대신 Item은 `useCart()`로 `cart`와 `addToCart`를 직접 꺼내 쓰고, App의 구매 함수(`handlePurchase`)는 `useCart()`의 `cart`와 `clearCart`를 쓰도록 바꾼다.

### Before

```
App (cart, handleAddToCart)
 ├─ CategoryPage  ← cart, onAddToCart (안 쓰고 전달만)
 │   └─ Item      ← cart, onAddToCart (여기서 사용)
 ├─ PricePage     ← cart, onAddToCart (전달만)
 │   └─ Item
 ├─ SortPage      ← cart, onAddToCart (전달만)
 │   └─ Item
 └─ Footer        ← onPurchase
```

### After

```
CartProvider (cart, addToCart, clearCart)
 └─ App           ← useCart()로 cart, clearCart 사용 (구매)
     ├─ CategoryPage  ← products만
     │   └─ Item      ← useCart()로 cart, addToCart 사용
     ├─ PricePage
     │   └─ Item
     ├─ SortPage
     │   └─ Item
     └─ Footer        ← onPurchase
```

### 바꾼 이유

- 페이지 컴포넌트는 cart를 쓰지 않고 Item에게 전달만 하고 있었다 (Props Drilling).
- 장바구니는 여러 페이지에서 같이 쓰는 데이터라서 Context로 빼기 좋다.
- 장바구니 로직(담기, 비우기)이 CartProvider 한 곳에 모여서 찾기 쉽다.
- 페이지는 `products`만 받아서 맡은 일(필터링, 정렬)이 더 잘 드러난다.
- products는 App에서 불러오고 새로고침하는 흐름이 그대로라서 App에 남겼다.