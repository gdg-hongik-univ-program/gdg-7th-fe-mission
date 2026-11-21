## week4_mission03
### 상태 관리(State Management)의 개념과 필요성
상태 관리: 웹이 실행되는 동안 변하는 데이터를 체계적으로 저장하고, 읽고, 갱신하는 방식
상태에 따라 사용자에게 제공하는 데이터가 다르므로 이를 일관되게 관리할 필요가 있다.
### Props Drilling
상태를 공통 부모에 두면, 중간에 그 값이 필요없는 컴포넌트까지 props를 계속 넘겨야한다. -> OOP원칙에 맞지 않고, 가독성을 저해한다.
### Context와 useContext
Context를 쓰면 props없이 값을 전달할 수 있다.
1. createContext로 Context를 만든다.
2. Provider로 값을 제공한다.
3. useContext로 꺼내서 사용한다.

공식 문서에는 Reducer와 같이 사용하는 것을 권장하는데, Reducer를 사용하면 컴포넌트가 state 갱신 로직을 통합할 수 있다.
### Context가 있는데도 상태 관리 라이브러리를 사용하는 이유
Context는 그저 값을 전달하는 도구이고, 상태 관리 기능을 따로 갖춘 것은 아니다.
값이 바뀌면 Context를 사용하는 모든 컴포넌트가 리렌더링 된다. 그래서 Provider가 많아지면 관리가 힘들고, 리렌더링 최적화하는 소요가 발생한다. 이런 부분을 라이브러리가 대신 처리해준다.
### 선택한 상태 관리 라이브러리의 특징과 사용법
Zustand: 단일 store방식이고, Provider가 필요 없다.
Jotai: atom 단위 구조이고, Provider를 선택적으로 사용할 수 있다. 
Redux Toolkit: 단일 store에 slice하는 방식이다. Provider가 필요하다.
리렌더링 최적화 방식도 각각 다르다.
### 선택한 라이브러리의 장단점
Zustand: 코드가 적고 배우기 쉽다. 프로젝트의 규모가 커지면 store구조를 직접 설계해야한다.
Jotai: 작은 상태를 잘게 나누기 좋다. 상태 흐름을 한눈에 보기 어렵다.
Redux Toolkit: 대규모 팀에 적합하다. 보일러 플레이트가 많고 학습량이 크다.
### 장바구니 상태 관리 개선 (리팩터링 전후 구조와 변경 이유)
