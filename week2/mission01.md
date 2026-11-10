### React의 등장

React가 등장한 데에는 과도한 서버 비용의 문제가 있었다. 사용자와 상호작용하기 위해서는 클라이언트의 각 요청에 대한 반응을 서버가 매번 업데이트해 줘야 한다. 그러나 모든 파일과 데이터를 모든 동작마다 다시 보내 주기에는 서버 비용이 지나치게 커지게 되고, 따라서 DOM(Document Object Model)을 조작해 페이지의 일부만 변경시키는 방법을 떠올리게 되었다. <br>

지속적인 DOM 조작도 상당히 비효율적이었기에, 가상의 DOM을 만들어 놓고 요청대로 조작한 후 완료된 결과만 모아서 업데이트하는 방식을 채택한 라이브러리가 바로 React이다. <br>

이런 방식을 사용했기에, 일반 변수에 아무리 새로운 값을 넣어도 화면은 변하지 않는다. 브라우저는 변수의 값이 바뀐 걸 알 방법이 없기 때문이다. 

### State
```js
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    function increment() {
        setCount(count+1);
    }
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={increment}>+1</button>
        </div>
    );
}
```
이렇게 실행할 경우, 브라우저에 상태(state)의 변경 여부를 전달해 줄 수 있다. <br>

useState은 다음과 같이 선언한다. 
```
const [state, setState] = useState(initialState);
```
props는 자식 컴포넌트에게 부모 컴포넌트의 변수를 상속하도록 전달해 주었다면, state는 컴포넌트 내에서 변경되는 상태를 관리한다. 

### 컴포넌트의 생애

1. Mount: 화면에 나타남
2. Update: 업데이트(리렌더) -> props 혹은 state 수신
3. Unmount: 화면에서 사라짐

## React Hooks 알아보기

### useState
: 컴포넌트가 기억해야 할 값(상태)을 관리함. <br>

특정 상태가 변경될 때 화면도 함께 업데이트 되도록 하기 위해 useState 훅이 필요하다. 다음과 같이 배열 구조 분해를 사용해 선언할 수 있다. 이는 컴포넌트 최상위 레벨 혹은 직접 만든 훅에서만 호출 가능하다. 

```js
const [state, setState] = useState(initialState);
```

`initialState`: state의 초기 설정값. callback 형태로 함수를 전달할 경우 그 함수를 초기화 함수로 취급해, 초기화 시 함수를 호출하고 반환값을 초기 state로 사용한다. <br>
`state`: 현재 state or initialState <br>
`setState`: 컴포넌트를 리렌더하는 함수. 리렌더 이후 인자 값으로 state을 업데이트한다. <br>
<br>
setState에는 다음 state를 직접 전달하거나 이전 state로부터 계산한 값을 전달할 수도 있다! <br>

```js
setAge(age => age+1);
```

callback 형태의 함수를 전달할 경우 업데이터로 취급한다. 업데이터는 대기 중인 state 값을 가져와 다음 state를 계산한다. <br>
객체 혹은 배열도 state에 넣을 수 있다. <br>

### useEffect
: 외부 시스템과 컴포넌트를 동기화 <br>

네트워크나 브라우저 API, 서드파티 라이브러리 등 React로 제어되지 않는 시스템들을 외부 시스템이라 부른다. 컴포넌트를 외부 시스템과 동기화하기 위해서는 컴포넌트 최상위 레벨에서 useEffect를 호출한다. 

```js
useEffect(setup, dependencies?)
```

`setup`: 설정 코드를 포함하는 설정 함수. 정리 함수를 반환할 수 있다. <br>
`dependencies`(optional): 설정 함수의 내부에서 참조되는 모든 반응형 값들의 배열 <br>
-> 의존성을 생략한 경우 컴포넌트가 리렌더링 될 때마다 실행

```js
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove); // 외부 시스템과 컴포넌트를 연결하는 설정 코드
    return () => {
      window.removeEventListener('pointermove', handleMove);
    }; // 연결을 해제하는 정리 함수를 반환
  }, []); // 의존성 배열
  // ...
}
```

React는 설정 함수와 정리 함수가 필요할 때마다 호출한다. 이는 여러 번일 수 있다. <br>

1. 컴포넌트가 렌더되면(mount) 설정 코드가 동작한다. 
2. 의존성이 변경된 컴포넌트가 리렌더링 될 때마다
    - 정리 코드가 이전 props, state와 함께 실행
    - 설정 코드가 새 props, state와 함께 실행
3. 컴포넌트가 제거되면(unmount) 정리 코드가 실행된다. 

즉 위 코드에서 컴포넌트 렌더 후 `pointermove` 이벤트가 감지되면 Effect는 포인터의 x좌표, y좌표 값을 가져올 수 있다. 컴포넌트가 제거되면 이벤트리스너가 해제되어 더 이상 이벤트를 감지하지 않는다. <br>

### useNavigate
: 사용자 상호작용에 대한 응답으로 브라우저에서 이동할 수 있는 함수를 반환

```js
let navigate = useNavigate();
navigate(to, options?)
```

`to`: 문자열 path or To 객체 or 숫자 <br>
`options`: 내비게이션을 제어할 수 있는 옵션을 포함한다. <br>
- `relative`: `route` or `path` 
- `replace`: History 스택에서의 현재 위치를 대체
- `state`(optional)

```js
navigate("/some/route"); // 다른 경로로 이동
navigate(-1); // 이전 경로로 이동, 모달을 닫을 때 자주 사용
```