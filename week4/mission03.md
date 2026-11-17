# Mission 3. 상태 관리

## 상태 관리란

상태(state)는 화면에 영향을 주는 데이터이고, 상태 관리는 이 데이터를 어디에 두고 어떻게 바꾸고 어떤 컴포넌트가 쓰게 할지 정하는 것이다.

컴포넌트 하나에서만 쓰는 값은 그 컴포넌트 안의 useState로 충분하다. 
그런데 장바구니처럼 여러 컴포넌트가 같은 값을 써야 하면, 그 값을 어디에 둘지가 문제가 된다. 
보통은 공통 부모로 state를 올리고 props로 내려주는데, 컴포넌트가 많아질수록 이 방식이 불편해진다.

## Props Drilling

데이터가 필요한 컴포넌트까지 가기 위해, 중간 컴포넌트들이 쓰지도 않는 props를 계속 받아서 넘겨주는 것.

기존 쇼핑몰 구조

App (cart, addToCart)
 └─ HomePage / CategoryPage / SortPage  → cart를 직접 쓰지 않고 전달만 함
     └─ Item                             → 실제로 cart를 쓰는 곳

문제점
- 중간 컴포넌트가 자기랑 상관없는 props를 받아야 해서 코드가 길어진다.
- props 이름을 바꾸거나 하나 추가하면 거쳐 가는 파일을 다 고쳐야 한다.
- 데이터가 어디서 오는지 따라가려면 여러 파일을 타고 올라가야 한다.

## Context와 useContext

Context는 props를 거치지 않고 컴포넌트 트리 아래쪽에 데이터를 바로 전달하는 React 내장 기능이다.

- createContext(): Context를 만든다.
- Provider: 만든 Context를 트리에 설치한다. Provider로 감싼 안쪽 컴포넌트들만 값을 꺼낼 수 있다.
- useContext(): 가장 가까운 Provider에서 값을 꺼낸다.

Provider의 value가 바뀌면 그 값을 useContext로 쓰고 있는 컴포넌트들이 다시 렌더링된다.

## Context가 있는데 라이브러리를 쓰는 이유

- Context는 값을 전달하는 기능이지, 상태를 관리하는 기능이 따로 있는 건 아니다. state는 결국 Provider 안의 useState로 직접 만들어야 한다.
- Provider의 value가 바뀌면 그 Context를 쓰는 컴포넌트가 전부 다시 렌더링된다. value 안의 값 하나만 바뀌어도 마찬가지라, 상태가 많고 자주 바뀌면 성능이 아쉬울 수 있다.
- 공유할 상태가 늘어나면 Context와 Provider도 계속 늘어나서 Provider가 여러 겹으로 감싸지게 된다.
- 라이브러리는 이런 부분(필요한 값만 구독하기, Provider 없이 쓰기 등)을 해결해준다.

## 선택한 라이브러리: Zustand

특징
- 설치해서 store를 만들고 훅처럼 꺼내 쓰는 방식이라 코드가 짧다.
- Provider로 감쌀 필요가 없다.
- 컴포넌트에서 store 전체가 아니라 필요한 값만 골라서 쓸 수 있고, 그 값이 바뀔 때만 다시 렌더링된다.

사용법

npm install zustand

import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (id, count) =>
    set((state) => ({ cart: [...state.cart, { id, count }] })),
  clearCart: () => set({ cart: [] }),
}));

// 컴포넌트에서
const addToCart = useCartStore((state) => state.addToCart);

장점
- Redux에 비해 보일러플레이트가 거의 없어서 배우기 쉽다.
- Provider가 없어서 트리 구조를 신경 쓰지 않아도 된다.
- 필요한 값만 구독해서 불필요한 리렌더링이 줄어든다.

단점
- 외부 라이브러리라 설치가 필요하고, 팀원 모두 사용법을 알아야 한다.
- 자유도가 높아서 store를 어떻게 나눌지 규칙을 정하지 않으면 오히려 정리가 안 될 수 있다.
- 지금처럼 공유 상태가 장바구니 하나뿐인 작은 프로젝트에서는 Context로도 충분해서 굳이 쓸 이유가 크지 않다.

## 쇼핑몰 장바구니 개선

### 선택: Context
공유가 필요한 상태가 장바구니 하나뿐이고 값이 자주 바뀌지도 않아서, 라이브러리 없이 React 내장 Context로 충분하다고 판단했다. 
상품 목록(products)은 App에서 불러오고 구매 후 다시 불러오는 흐름이 App에 있어서 그대로 두고, 장바구니만 Context로 옮겼다. 
모든 state를 전역으로 둘 필요는 없어서 Item의 count 같은 값은 그대로 컴포넌트 안에 두었다.

### 리팩터링 전
- cart state와 addToCart가 App에 있었다.
- App → 페이지 3개 → Item 순서로 cart, onAddToCart를 props로 내려줬다.
- 페이지마다 cart.some((c) => c.id === item.id)로 담긴 상품인지 확인하는 코드가 똑같이 들어가 있었다.

### 리팩터링 후

src/stores/cartContext.js
- CartContext를 만들고, 꺼내 쓰는 커스텀 훅 useCart를 export

src/stores/CartProvider.jsx
- cart state와 addToCart, clearCart, isInCart를 가지고 Provider로 내려줌

main.jsx
- App을 CartProvider로 감쌈

App.jsx
- useState로 만들던 cart 대신 useCart()에서 cart, clearCart를 꺼내서 구매 처리에만 사용
- 페이지에 cart, onAddToCart를 넘기지 않고 products만 넘김

페이지 3개
- cart, onAddToCart props 삭제
- <Item key={item.id} item={item} /> 형태로 단순해짐

Item.jsx
- props 대신 useCart()로 addToCart, isInCart를 직접 꺼내서 사용

구조

CartProvider (cart)
 └─ App            → useCart()로 cart, clearCart 사용 (구매)
     └─ 페이지들    → 장바구니 관련 props 없음
         └─ Item   → useCart()로 addToCart, isInCart 사용

### 변경 이유와 결과
- 장바구니를 실제로 쓰는 App과 Item만 useCart()로 가져다 쓰고, 중간 페이지들은 장바구니를 몰라도 되게 됐다.
- 페이지 3곳에 중복되던 담긴 상품 확인 코드를 CartProvider의 isInCart 하나로 묶었다.
- 컴포넌트와 훅을 한 파일에서 같이 export하면 ESLint(react-refresh 규칙)가 경고를 줘서, Context와 훅은 cartContext.js, Provider 컴포넌트는 CartProvider.jsx로 나눴다.
- 페이지에서 props만 지우고 Item 쪽 코드를 안 지웠을 때 ESLint가 'cart' is not defined 에러로 빠진 곳을 바로 알려줘서, 미션 2에서 설정한 lint가 리팩터링할 때 도움이 됐다.

### 동작 확인
npm run lint 에러 0개, format:check 통과를 확인했다. 
화면에서 장바구니 담기 후 버튼이 회색으로 바뀌는 것, 구매 후 장바구니가 비워지는 것, 카테고리/정렬 페이지에서도 담기가 되는 것을 확인했다.