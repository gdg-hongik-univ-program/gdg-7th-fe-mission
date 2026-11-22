## week4_mission01
### 리팩터링
리팩터링: 밖에서 보이는 동작은 그대로 두고, 안쪽 구조만 바꾸는 것. 즉, 가독성을 높이고, 중복을 줄이고, 유지 보수성을 높이게 하는 것.
### Custom Hook
다른 Hook(useState나 useEffect)를 호출하는 함수로, 컴포넌트 간 상태를 유지하기 위해 만든다.
이름 규칙: use다음에 대문자로 시작해야한다.
### 일반 함수와 Custom Hook의 차이
일반 함수는 안에서 Hook을 호출하지 못하지만 Custom Hook은 가능하다
Custom Hook은 컴포넌트 최상위에서만 호출이 가능하다.
일반함수와 다르게 Custom Hook은 상태나 Effect가 있는 로직을 위해 사용한다.
### 쇼핑몰 코드에서 리팩터링하거나 Custom Hook으로 바꿀 수 있는 사례
App.jsx에 상품 로딩 로직(state + useEffect + refresh)-> hooks/useProducts.js로 분리
안에서 useState, useEffect를 쓰니까 일반 함수가 아니라 Custom Hook으로 뺌
