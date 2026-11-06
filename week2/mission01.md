React Hooks

props : properties의 줄임말로, 컴포넌트간의 관계를 의미함.

상위 컴포넌트의 state 값을 하위 컴포넌트가 사용할 경우, 상위 컴포넌트의 state가 바뀌면 하위 컴포넌트는 새롭게 렌더링됨.

모든 컴포넌트는 동일한 생명주기를 가진다. 다음은 props의 기본적인 틀
- 화면 추가 시 마운트됨.
- 새로운 props 혹은 state를 수신하면 업데이트됨.
- 컴포넌트가 화면에서 제거되면 마운트가 해제됨.

예시를 들어 function으로 인해 상위 state 값이 변한다면, props로 하위에 값을 보내줌. 이를 하위 컴포넌트가 수신해서 연산을 해 결과를 보여줌.

state : 상태 값을 저장하는 변수
setState : 상태 값을 갱신하는 함수
initialState : 시작 시 상태를 설정

setState는 비동기로 작동함. 즉 자동적으로 동기화가 되지 않으므로 상대틑 감지하는 hook이 필요함.

React Hook가 필요한 이유는 바로 이것 때문이다.

기본적인 React Hook 종류들
useState : 컴포넌트의 상태 (status)를 관리하는 Hook
현재 상태 값과 해당 값을 업데이트하는 함수로 구성된 배열 반환함.

const [state, setState] = useState(initialState);

이 코드는 에러가 발생함.

import React, { useState } from "react";

export function CheckoutPage() {
  const [amount, setAmount] = useState(50000);
  setAmount((prevState) => prevState - 10000); // 잘못된 사용 예제
}

이유는? 위 코드에서는 { 컴포넌트 렌더 → setAmount → 컴포넌트 리렌더 → setAmount ... }의 무한 루프가 생겨서 에러가 발생함.

실제로 상태값은 특정 이벤트로 인해 바뀜. 바로 호출하면 에러가 생김.

useEffect
컴포넌트가 mount unmount update 되었을 때 특정 작업을 실행시킴.

보통 상태가 바뀔 때 특정 작업을 처리하기 위해 사용하는데, 특정한 상황에 특정한 작업을 수행해야할 때 사용하며, 의존성 배열 안에 넣은 값이 변경될 때마다 동작 ([]안의 값)

useEffect(callback, dependencyArray);

1. mount update

useEffect(callback, dependencyArray);

callback : 컴포넌트가 렌더링 될 때 실행시킬 함수
dependencyArray : 배열형태의 인수로서 배열 내 값이 변경될 때마다 useEffect가 실행하라고 설정

이 안에 []을 넣고 값과 변수를 지정함.

작업이 끝나면, cleanup이 필요하다.
이는 useEffect의 return 값으로 함수를 넣어줌.
이렇게 되면 함수 리턴 시 해당 컴포넌트가 unmount될 때, 혹은 다음 렌더링 시 불릴 useEffect가 실행되기 전에 이 함수가 실행됨.

useNavigate
특정 이벤트 발생 시 다른 경로(페이지)로 쉽게 이동시키는 Hook

useNavigate 훅을 실행하면 페이지 이동을 할 수 있게 해주는 함수를 반환
- 사용법: 반환하는 함수를 navigate라는 변수에 저장 후 navigate의 인자로 설정한 path값을 넘겨주면 해당 경로로 이동

직접 호출하지 않고 변수로 선언 -> 반환된 함수 호출하는 이유?

Hook은 오직 컴포넌트 최상단에서만 호출하기 때문에, 다른 조건문, 함수선언문, 반복문 등 중첩된 함수 안에서, 컴포넌트 내부함수에서 callback으로 호출 불가.

예시 코드

import { useNavigate } from 'react-router-dom'; 

// ...생략

const navigate = useNavigate();

// ...생략

const gotoMain = () => {
  navigate("/main", {
    state: {
      userId: user.uid
    }
  });
};

보통 첫 번째 인자로 이동시킬 페이지의 주소를 넣거나 (navigate('/주소')) -1 과 같은 값을 넣어 뒤로가기 동작을 넣기도 함.

여기서 잠깐! Link 와의 차이점은?

Link 컴포넌트로 만든 부분은 클릭 시 바로 이동하지만, useNavigate는 조건부 이동으로, 추가로 처리해야 하는 로직이 있을 때 사용함.