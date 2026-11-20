# 상태 관리(State Management)
- 상태 관리(State Management) : 여러 컴포넌트가 함께 쓰는 State를 어디에 두고, 어떻게 전달하고 바꿀지 정하는 방법. 여러 component간에 데이터 전달과 이벤트 통신을 한 곳에서 관리하는 것

#### 상태관리의 필요성
1. 데이터가 바뀌어도 페이지가 렌더링 되지 않게 하기 위해
2. state들이 복잡하게 얽혀있을 때 효율적인 관리를 위해
--------------------
# Props Drilling
- 개념 : 컴포넌트 트리에서 데이터를 하위 컴포넌트로 전달하기 위해 중간 컴포넌트를 통해 프로퍼티를 내려주는 것
##### 문제점
- 프로퍼티 데이터 형식 변경의 불편함
- 중간 컴포넌트에 불필요한 프로퍼티 전달
- 누락된 프로퍼티 인지의 어려움
- 프로퍼티 이름 변경 추적의 어려움
-----------------
# Context와 useContext

## Context
- 컴포넌트 트리 전체에 걸쳐 Props를 일일이 넘겨주지(Prop Drilling) 않고도 데이터를 공유할 수 있게 해주는 기능
## useContext
- 중간 컴포넌트를 거치지 않고(prop drilling 없이) 컴포넌트 트리 깊숙한 곳에서 Context 값을 읽게 해주는 React 훅
---------------
# 상태 관리 라이브러리

#### context가 있음에도 라이브러리를 사용하는 이유
context는 직접 만들어야할 코드가 많고 부가기능이 없다. 또한, context는 작은 프로젝트나 자주 바뀌지 않는 값을 공유 할 때 사용하는 것이 적합하다.

### 관심있는 상태 관리 라이브러리 : Redux
- 특징
    - Flux 아키텍처 사용
    - 단방향 데이터 흐름
    - 데이터 변화 예측하기 쉬움
- 사용법
    - RTK(React Tool Kit)을 함께 설치
    - app.tsx, app.css 등 기본 세팅 초기화
    - index.css에 tainwind css 적용
    - useSelector : store에 저장된 내용을 read
    - useDispatch : state값을 변경하기 위해서 사용
------------------
# Redux의 장단점

## 장점
- 상태가 일관되게 동작하며, 다양한 환경에서도 같은 결과를 보장
- 애플리케이션의 모든 상태를 하나의 저장소(Store)에 보관하므로 상태 추적이 쉬움
- 디버깅 용이

## 단점
- 코드를 작성하는 가장 짧거나 빠른 방법 x
- 배워야할 개념과 작성해야 할 코드가 많음
--------------------
# 리팩터링 전 구조
```
App  ← cart State, addToCart 함수 보관
 ├─ Content       ← cart, onAddToCart 받음 (전달만)
 │   └─ Item      ← cart, onAddToCart 받아서 사용
 ├─ CategoryPage  ← cart, onAddToCart 받음 (전달만)
 │   └─ Item      ← 사용
 ├─ PricePage     ← cart, onAddToCart 받음 (전달만)
 │   └─ Item      ← 사용
 └─ SortPage      ← cart, onAddToCart 받음 (전달만)
     └─ Item      ← 사용
```
-----------------------
# 리팩터링 후 구조
```
CartProvider  ← cart State, addToCart 함수 보관 + 방송
 └─ App           (장바구니 코드 없음)
     ├─ Content       (장바구니 props 없음)
     │   └─ Item      ← useCart()로 직접 꺼내 사용
     ├─ CategoryPage  (장바구니 props 없음)
     │   └─ Item      ← useCart()
     ├─ PricePage     (장바구니 props 없음)
     │   └─ Item      ← useCart()
     └─ SortPage      (장바구니 props 없음)
         └─ Item      ← useCart()
```
-----------------
# 변경 이유
1. props drilling 해결함으로써 중간 전달이 사라짐
2. 수정할 파일이 줄어듦
3. 장바구니 코드가 한곳에 모임
4. 다른 컴포넌트에서도 쉽게 사용