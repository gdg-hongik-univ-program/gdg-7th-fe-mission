# React Router
React 애플리케이션에서 클라이언트 사이드 라우팅을 쉽게 구현할 수 있도록 도와주는 표준 라이브러리이다. 

- 라우팅: 사용자가 요청한 URL 주소에 따라 그에 맞는 페이지나 화면을 보여주는 과정
- 기존 방식(MPA): 링크를 누를 때마다 부라우저가 서버에 새 HTML 페이지를 통쨰로 요청함
## SPA와 클라이언트 사이드 라우팅
### SPA
Single Page Application  
HTML 페이지는 처음 한번만 받고, 그 뒤로는 JavaScript가 화면 내용만 바꾼다. 
### 클라이언트 사이드 라우팅
SPA에서 주소마다 다른 화면을 보여주고 싶을 때 브라우저(클라이언트)에서 주소를 보고 어떤 컴포넌트를 그릴지 정한다. 
- 주소창의 URL은 바뀌지만, 서버에 새 페이지를 요청하지 않는다. 
- 그래서 새로고침이 없고 빠르다. state도 유지된다. 
- 뒤로 가기와 앞으로 가기도 그대로 동작한다. 

React Router가 이 일을 해주는 라이브러리이다. 
## `BrowserRouter`, `Routes`, `Route`의 역할
### `BrowserRouter`
앱 전체를 감싸서, 그 안에서 React Router 기능을 쓸 수 있게 해 준다.  
보통 `main.jsx`에 한 번만 쓴다. 
```js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### `Routes`와 `Route`
- `Route`: 이 주소(`path`)면 이 화면(`element`)을 보여주라는 규칙 하나이다. 
- `Routes`: `Route`들을 묶는 상자이며, 지금 주소에 맞는 Route를 골라서 그려 준다. 
```js
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
```
### 자주 쓰는 형태
- 중첩 라우트 + `Outlet`: 부모 라우트 안에 자식 라우트, `index`로 기본 화면 표시
- 레이아웃 라우트: `path` 없이 `element`만 쓴다
- 옹적 세그먼트 + `useParams`


## `Link`와 `useNavigate`를 활용한 페이지 이동
### `Link`
사용자가 눌러서 이동한다. 
```js
import { Link } from "react-router";

<Link to="/cart">장바구니</Link>
```
`<a href>`처럼 생겼지만 새로고침 없이 이동한다.  

지금 보고 있는 페이지의 메뉴를 강조할 때는 `NavLink`를 쓴다. 

### `useNavigate`
코드로 이동한다. 
```js
import { useNavigate } from "react-router";

function LoginForm() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // 로그인 처리 끝나면
    navigate("/dashboard");
  }
}
```
- `navigate("/path")`: 해당 주소로 이동
- `navigate(-1) / navigate(1)`: 뒤로 / 앞으로

보통의 이동은 `Link`나 `NavLink`를 쓴다.  
`useNavigate`는 사용자가 링크를 누르는 상황이 아닐 때 쓴다. 

# 일반 CSS / CSS Modules / Tailwind Css의 차이

## 일반 CSS
`.css`파일을 import하면 모든 클래스가 전역(global)으로 적용된다.  
충돌은 캐스케이드가 정해진다. (순서)  

- 장점: 기본이다.
- 단점: 다른 파일과 이름이 겹치면 스타일이 서로 덮어쓴다. 

## Css Modules
파일 안의 클래스 이름이 기본적으로 그 파일 안에서만 쓰인다(지역). 그래서 다른 파일에서 같은 이름을 써도 안 겹친다.  
Vite에서는 파일 이름을 `.module.css`로 끝내면 바로 CSS Modules가 된다. 
```js
import styles from './Content.module.css';
<button className={styles.searchButton}>검색</button>
```

import하면 객체가 돌아온다.  
빌드할 떄 클래스 이름이 고유한 이름으로 바뀌어서 충돌이 안 난다. 

- 장점: CSS 문법은 그대로 쓰면서 충돌만 없다. 컴포넌트마다 CSS 파일을 하나씩 두기 좋다. 
- 단점: `className={styles.xxx}`처럼 쓰는게 번거로울 수 있다. CSS 파일을 따로 왔다 갔다 해야한다. 

## Tailwind CSS
CSS 파일을 따로 쓰지 않고, 이미 만들어진 작은 클래스(유틸리티)를 JSX에 조합해서 꾸민다. 
```js
<button className="rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-700">
  검색
</button>
```

Vite에 설치해서 써야된다.  
`hover:`, `focus:` 같은 상태와 `md:` 같은 반응형 조건을 쓸 수 있다. 

- 장점: 클래스 이름을 고민하지 않아도 되고, 파일을 왔다 갔다 할 일이 없어서 빠르다. 
그 요소에만 적용되어서 고쳐도 다른 곳이 안 깨진다. 
같은 클래스를 재사용해서 CSS 파일이 계속 커지지 않는다. 

- 단점: 클래스가 길어져서 JSX가 지저분해 보인다. 배울 것이 많다. 

반복문(map)으로 쓰거나, 컴포넌트로 만들어서 단점을 줄일 수 있다. 
