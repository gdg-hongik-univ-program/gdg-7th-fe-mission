1. props와 state 이해하기
props는 전달받고, state는 직접 관리한다. props는 부모가 component에 전달하는 정보이고 state는 component가 관리하는 상태, 즉 현재 정보이다. 또한 props는 부모가 새 값을 줄 수 있어 자식이 직접 값을 변경할 필요가 없고, state는 변경함수를 요청하여 다시 그릴때도 이어진다.
2. useState, useEffect, useNavigate 사용법과 작동원리를 학습하기
useState는 컴포넌트의 상태를 관리한다. 현재 상태를 기억하고 다음 상태를 요청한다. const [state, setState] = useSate(initialState);
형태로 쓰며 현재상태와 요청상태를 배열로 return하고 초기값을 계속해서 새롭게 갱신할 수 있다.
useEffect는 현재 컴포넌트를 외부 시스템과 동기화할 때 사용한다. sideEffect의 처리를 위해 사용되며 렌더링이 완료된 후에 실행된다. 이때 서버 렌더링에서는 동작하지 않고 client환경에서만 동작한다.
useEffect(callback, dependencyArray); 형태로 쓰며 컴포넌트가 렌더링 될 때 callback 함수를 실행시키고, 배열형태의 dependencyArray가 값이 변경할때마다 설정된다.
useNavigate는 특정 이벤트 발생 시 다른 페이지로 이동시킬 때 사용한다. navigate('/주소') -1 과 같은 값을 넣어 뒤로가기 동작을 넣을 수도 있고 {return : true/false} 옵션을 넣어 뒤로가기의 가능 여부를 정할 수도 있다.