## week4_mission02
### Linting과 Formatting
Linting: 소스 코드를 실행하지 않고 정적 분석하여 잠재적인 버그, 문법 오류, 스타일 위반 등을 찾아내는 과정
Formatting: 코드의 시작적 모양을 일정하게 맞추는 작업
### ESLint와 Prettier의 역할 및 차이점
ESLint: 자바스크립트 코드에서 발견된 문제 패턴을 식별하기 위한 정적 코드 분석 도구. 즉 Linting을 담당
Prettier: 일관적인 코드 스타일을 유지할 수 있게 도와주는 툴. ex-줄바꿈, 공백, 들여쓰기, 즉 Formatting을 담당
### ESLint와 Prettier를 함께 사용하는 이유
Linter에는 코드 품질 규칙 말고도 스타일 규칙도 들어있는데, Prettier를 쓰면 대부분 불필요하고 충돌 할 수 있기 때문에 역할을 나눠서 같이 쓴다.
### ESLint와 Prettier 사용 결과
npx eslint . 했을 때 결과 -> App.jsx에서 RouterContextProvider를 쓰고 않는 변수라고 함.
npx prettier --write -> 큰따옴표와 작은따옴표를 섞어써서 19개의 파일이 형식 다름으로 나옴 -> npx prettier --write . 으로 고침