# props와 state 학습하기
React
편하게 따로따로 만들기 위해 React 사용
Dom 조작 계속하다보니 메모리 사용 많아짐 - virtual DOM

Counter 버튼에 `console.log()`를 넣어줘도 숫자가 안올라간다.
- useState로 상태를 만들어줘야함
- useState: 브라우저가 인지할 수 있는 훅
```js
Function UseStates() {
    const [name, setName] = useState(0);
    return ()
}
export default UseStates;
```

상위 state 값 변경
props로 하위에 값 보내줌
count 값으로 rgb 값 가공
가공된 rgb 값 스타일 작업
스타일을 태그에 적용

## 컴포넌트의 생애 주기
새로운 props나 state를 수신하면 업데이트 된다.  
예전에는 컴포넌트가 class형이고 지금은 함수형이다.  
과거 함수형에는 state가 없었어서 반쪽짜리 컴포넌트였다.   
Hook이 나오고 나서 장점이 늘었다.  

## Props
부모가 자식에게 건네는 정보이자, 컴포넌트끼리 정보를 주고받는 방법이다.  
부모 컴포넌트가 자식 컴포넌트에게 props를 줘서 정보를 넘긴다. 
```js
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```
props는 그 순간의 스냅샷으로, 렌더링될 때마다 새 props를 받는다.  
컴포넌트가 props를 직접 바꾸면 안 되고, 바뀌어야 하면 부모가 새 props를 다시 넘긴다. 

## State
컴포넌트가 정보를 기억하는 방법이다.  
버튼을 누르면 바뀌는 값처럼, 상호작용에 따라 달라지는 데이터이다. 
```js
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  function handleClick() {
    setIndex(index + 1);   // 값 바꾸고 + 다시 렌더링 요청
  }
  ...
}
```
같은 컴포넌트를 두 번 쓰면 state도 각자 따로 생긴다.  
부모는 자식의 state를 모르고, 바꿀 수도 없다. 

## useState
```js
const [state, setState] = useState(initialState);
```
- `initialState`: 처음 값이고, 첫 렌더링 때만 쓰인다. 
- 돌려주는 것: [현재 값, set 함수]

state는 스냅샷이라, 바뀐 값은 다음 렌더링에서 보인다.  

이전 값으로 계산할 때는 함수로 넘겨야 한다. 
```js
function handleClick() {
  setAge(age + 1);
  setAge(age + 1);
  setAge(age + 1);   // 42 → 43 (3번이 아니라 1번만 오름)
}

function handleClick() {
  setAge(a => a + 1);
  setAge(a => a + 1);
  setAge(a => a + 1); // 42 → 45
}
```

객체, 배열은 직접 고치지 말고 새로 만들어서 교체해야 한다. 

## useEffect
컴포넌트를 외부 시스템과 동기화하는 Hook이다.  
외부 시스템은 서버, 네트워크, 브라우저 API, 타이머처럼 React 바깥에 있는 것들이다. 

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();          // setup: 연결
    return () => {
      connection.disconnect();     // cleanup: 연결 끊기
    };
  }, [serverUrl, roomId]);         // 의존성 배열
  // ...
}
```
- setup 함수: 컴포넌트가 화면에 그려진 다음에 실행된다. 
- cleanup 함수(return): 다음 setup을 실행하기 전, 그리고 컴포넌트가 사라질 때 실행된다. setup이 한 일을 되돌린다. 
- 의존성 배열: 언제 다시 실행할지 정한다. 

### 의존성 배열에 따라 달라지는 실행 시점
- `useEffect(() => {...}, [a, b])`: 처음 + `a`나 `b`가 바뀔 떄마다 실행
- `useEffect(() => {...}, [])`: 처음 한 번만 실행
- `useEffect(() => {...})`: 렌더링될 때마다 실행

effect 안에서 쓰는 props와 state는 전부 의존성에 넣어야 한다. 

## useNavigate
useNavigate는 React공식 문서가 아니라 React Router 라이브러리의 Hook이다.  
그래서 출처를 reactrouter.com으로 적어야 한다. 

코드에서 직접 페이지를 이동시키는 함수를 돌려주고, 버튼 클릭, 폼 제출, effect 안처럼 링크를 쓸 수 없는 곳에서 이동할 때 쓴다. 
```js
import { useNavigate } from 'react-router';  // v6에서는 'react-router-dom'

function LoginButton() {
  const navigate = useNavigate();

  function handleClick() {
    // 로그인 처리 후
    navigate('/dashboard');
  }

  return <button onClick={handleClick}>로그인</button>;
}
```

### 자주 쓰는 형태
```js
navigate('/products');                       // 해당 경로로 이동
navigate(-1);                                // 뒤로 가기
navigate(1);                                 // 앞으로 가기
navigate('/login', { replace: true });       // 기록을 남기지 않고 교체 (뒤로 가기로 못 돌아옴)
navigate('/detail', { state: { id: 3 } });   // 이동하면서 데이터 전달
```
`state`로 넘긴 값은 이동한 페이지에서 `useLocation().state`로 읽는다. 

- 사용자가 눌러서 이동하는 메뉴나 링크: `<Link to="/...">`
- 어떤 일이 끝난 뒤 코드로 이동: `navigate()`
