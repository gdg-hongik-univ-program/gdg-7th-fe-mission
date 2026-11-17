# Mission 2. ESLint & Prettier

## Linting과 Formatting

Linting
- 코드를 실행하기 전에 문제가 될 수 있는 부분을 찾아주는 것
- 선언만 하고 안 쓰는 변수, 훅을 잘못된 위치에서 호출한 경우처럼 버그로 이어질 수 있는 패턴을 잡아준다.

Formatting
- 코드의 모양을 일정한 규칙에 맞게 정리하는 것
- 들여쓰기, 따옴표, 세미콜론, 줄바꿈 같은 스타일만 바꾸고 동작은 바꾸지 않는다.

## ESLint와 Prettier

ESLint
- JavaScript 린터. 정해진 규칙에 따라 코드의 문제를 찾아 에러나 경고로 알려준다.
- 이 프로젝트에서는 기본 JS 규칙, react-hooks 규칙, react-refresh 규칙을 쓰고 있다.

Prettier
- 코드 포맷터. 설정한 규칙대로 코드를 자동으로 다시 정리해준다.
- 사람마다 다른 코드 스타일을 하나로 맞출 수 있다.

차이점
- ESLint는 코드가 맞는지(품질), Prettier는 코드가 어떻게 생겼는지(스타일)를 담당한다.

## 같이 쓰는 이유

둘의 역할이 다르기 때문에 같이 쓰면 품질과 스타일을 둘 다 챙길 수 있다. 
다만 ESLint에도 스타일 관련 규칙이 일부 있어서 Prettier와 부딪힐 수 있다. 
그래서 eslint-config-prettier를 추가해서 ESLint의 스타일 규칙은 끄고, 스타일은 Prettier가 전부 맡도록 했다.

## 프로젝트 적용

### 기존 설정 확인
- Vite로 프로젝트를 만들 때 ESLint는 이미 설치되어 있었다.
- package.json에 eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh가 있고, eslint.config.js 파일과 lint 스크립트도 있었다.
- Prettier는 설치되어 있지 않았다.

### 설정 방법
1. Prettier와 eslint-config-prettier 설치

npm install -D prettier eslint-config-prettier

2. .prettierrc 파일 생성

{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}

- 세미콜론 사용, 큰따옴표 사용, 들여쓰기 2칸, 한 줄 최대 80자로 정했다.
- 원래 코드에서 큰따옴표를 더 많이 쓰고 있어서 큰따옴표로 맞췄다.

3. eslint.config.js에 eslint-config-prettier 추가

import eslintConfigPrettier from 'eslint-config-prettier/flat'
...
export default defineConfig([
  ...
  eslintConfigPrettier,
])

- 앞의 규칙들을 덮어써야 해서 배열 맨 마지막에 넣었다.

4. package.json에 스크립트 추가

"format": "prettier --write src",
"format:check": "prettier --check src"

- 저장할 때 자동으로 바뀌면 뭐가 바뀌었는지 알기 어려워서, 명령어로 직접 실행하도록 했다.

## 적용 결과

### ESLint
npm run lint를 실행했을 때 에러와 경고는 0개였다. 
그동안 안 쓰는 변수나 import 없이 작성해서 고칠 부분은 없었다.

### Prettier
적용 전에 npm run format:check를 실행하니 11개 파일에서 스타일 경고가 나왔다.
(App.jsx, App.css, products.js, Content.jsx, Footer.jsx, Item.jsx, mockData.js, main.jsx, AdminPage.jsx, CategoryPage.jsx, SortPage.jsx)

npm run format으로 적용한 뒤 바뀐 내용

- 따옴표, 세미콜론 통일: App.jsx, main.jsx는 작은따옴표에 세미콜론이 없었는데 큰따옴표와 세미콜론으로 바뀌었다.
  import { Routes, Route } from 'react-router'
  → import { Routes, Route } from "react-router";

- 들여쓰기 통일: AdminPage.jsx만 들여쓰기가 4칸이었는데 다른 파일처럼 2칸으로 바뀌었다.

- 긴 줄 줄바꿈: 80자가 넘는 줄은 여러 줄로 나뉘었다.
  <Route path="/" element={<HomePage products={products} cart={cart} onAddToCart={addToCart} />} />
  →
  <Route
    path="/"
    element={
      <HomePage
        products={products}
        cart={cart}
        onAddToCart={addToCart}
      />
    }
  />
  products.js의 searchProduct fetch 주소, CategoryPage.jsx의 삼항연산자, Item.jsx의 남은 수량 span도 같은 이유로 줄바꿈되었다.

- 파일 끝 빈 줄 추가: 마지막 줄 뒤에 줄바꿈이 없던 파일들에 빈 줄이 추가되었다.

### 적용하면서 고친 부분
App.jsx에 `<Route ... />        </Routes>`처럼 닫는 태그가 앞 줄에 붙어 있는 곳이 있었다. 
이대로 Prettier를 돌리면 태그 사이 공백을 텍스트로 인식해서 {" "}가 들어가기 때문에, 먼저 닫는 태그를 다음 줄로 내린 다음 적용했다.

### 동작 확인
포맷 적용 후에도 npm run lint 에러 0개, format:check 통과를 확인했고, npm run dev로 실행했을 때 기존 화면과 기능이 그대로 동작했다.
