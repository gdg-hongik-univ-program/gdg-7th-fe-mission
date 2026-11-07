## week2_mission01
### Props
부모 컴포넌트가 자식 컴포넌트에게 값을 전달할때 사용하는 것. 코드의 재 사용성을 향상 시켜준다. props에는 다양한 형태의 데이터를 담을 수 있다. 
* props는 읽기 전용이므로 컴포넌트 내부에서 props를 수정해서는 안된다. 

### State
컴포넌트 내부의 동적 데이터이다. 여러 개의 자식으로부터 데이터를 모을때 사용한다. 두 컴포넌트 간의 state를 동기화 하는 일은 state값을 필요로 하는 컴포넌트 간의 가장 가까운 공통 조상 컴포넌트로 state를 lifting up하는 것이다. 동기화 시키기 보다 공통 조상으로 끌어올려서 하향식 데이터 흐름을 이용하는 것이 가독성이 도움이 될 것 같다.

#### 컴포넌트의 Lifecycle
Mount: 컴포넌트가 화면에 처음 나타남.
Update: 컴포넌트가 새로운 상태로 갱신.
Unmount: 컴포넌트가 화면에서 제거됨.


### Hook 사용의 장점
1. 코드 재사용성, 독립성
2. 상태 로직 단순화
3. 사이트 이펙트 감소

* 같은 훅 여러번 호출 가능
* 컴포넌트 최상위에서만 호출 가능(반복문이나 조건문, 중첩된 함수 내에서 사용 불가), 동일한 순서로 Hook이 호출되어야하기 때문이다.


#### useState
컴포넌트의 상태를 관리하는 Hook, 현재 상태 값과 해당값을 업데이트하는 함수로 구성된 배열 반환.
useState는 초기값 설정이 필요함.

setState의 주의점: state가 변할 때마다 렌더링이 발생함.(props나 state가 변경될 때)
setter함수를 호출하면 상태값을 변경할 수 있고, 해당 컴포넌트 전체가 리렌더링 된다.
* * 컴포넌트 안에서 setter 함수를 조건없이 바로 호출하면 에러가 발생.
setter는 비동기로 동작하므로 상태변화를 감지하는 훅이 필요함.
setState() 호출 > React에 상태 업데이트 요청 > 새로운 State로 렌더링 > 화면 반영

#### useEffect
외부 시스템과 컴포넌트를 동기화 하는 Hook, 컴포넌트가 렌더링 될 때 특정 작업을 실행할 수 있게 한다.
```.js
useEffect(() => {
    <!--실행할 작업>
}, [dependendies]) <!--의존성 배열; 즉 이 값이 변하면 화살표 함수 실행>
```

의존성 배열이 만약 빈 배열인 경우에는, useEffect의 콜백함수는 렌더링 될때 딱 한번만 실행. 아무것도 저장하지 않으면 렌더링 될 때마다 실행

cleanup 함수는 Effect가 만들어 놓은 작업을 정리하는 함수를 의미한다. 대부분 Unmount거나 의존성 값이 변경되어 Effect가 재 실행될때 실행된다. (useEffect의 return으로 사용)

#### useNavigate
특정 이벤트 발생 시 다른 경로로 쉽게 이동시키는 Hook.
반환하는 함수를 navigate라는 변수에 저장 후 navigate의 인자로 설정한 path값을 넘겨주면 해당 경로로 이동함. 
ex_로그인하고 다음 페이지로 갈 때.
```.html
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");     <!--로그인 경로로 이동한다.>
  }

  return (
    <button onClick={handleClick}> 
      로그인
    </button>
  );
}
```
2번째 인자
replace 옵션: ture로하면 현재 기록이 방문 기록을 대체함.
state 옵션: 추가적으로 보낼 데이터. useLocation()으로 읽는다. 


- Link와 useNavigate의 차이: link는 사용자자 링크를 클릭해 이동하고 useNavigate는 특정 로직을 실행한 결과로 이동하는 것이다.
