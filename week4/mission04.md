## week4_mission04
### 주요 폴더의 역할 (components, pages, apis, hooks, utils 등)
pages: 라우트 화면 / components: 공통 UI / layouts: Navbar, Footer

### 파일 분리 기준
라우트면 pages, 아니면 components
두 군데 이상 쓰면 분리, Hook 쓰면 hooks, 아니면 utils

### 리팩터링한 내용
폴더 구조: pages, layouts, styles로 나누고 import 경로 수정
중복 제거: 카테고리 드롭다운이 Category.jsx와 Register.jsx에 똑같이 있어서 CategorySelect.jsx로 합쳤다.

### 리팩터링 전후 폴더 구조
전: src/{components/{pages}, manage, App.css, index.css}
후: src/{pages, components/{manage}, layouts, hooks, contexts, utils, styles}

### 변경 이유
페이지가 여러 폴더에 흩어져 있어서 찾기 어려웠기 떄문이다.