# React Router

React는 기본적으로 index.html 하나만 사용하는 SPA(Single Page Application)이다.
기존 웹사이트는 페이지를 이동할 때마다 서버에서 새 HTML을 받아와서 화면이 새로고침되지만, SPA는 처음에 한 번만 HTML을 받고 이후에는 JavaScript가 주소에 맞는 컴포넌트로 화면만 바꿔서 보여준다. 그래서 페이지 이동이 빠르고 깜빡임이 없다.
이렇게 브라우저 안에서 주소에 따라 화면을 바꾸는 것을 클라이언트 사이드 라우팅이라고 하고, 이걸 쉽게 할 수 있게 해주는 라이브러리가 React Router이다.

### BrowserRouter
앱 전체를 감싸서 라우팅 기능을 사용할 수 있게 해준다. main.jsx에서 App을 감싸주었다.

<BrowserRouter> <App /> </BrowserRouter>

### Routes, Route
Route는 어떤 주소일 때 어떤 컴포넌트를 보여줄지 정하는 규칙이고, Routes는 그 Route들 중 현재 주소에 맞는 하나를 골라서 보여준다.

<Routes> <Route path="/" element={<HomePage />} /> <Route path="/category" element={<CategoryPage />} /> <Route path="/sort" element={<SortPage />} /> </Routes>

Navbar와 Footer는 Routes 바깥에 두어서 어느 페이지로 이동해도 항상 보이게 했다.

### Link, useNavigate
둘 다 페이지를 이동할 때 쓴다. 일반 a 태그를 쓰면 페이지가 새로고침되기 때문에 React에서는 이 두 가지를 사용한다.
Link는 클릭하면 이동하는 링크를 만드는 컴포넌트이다.

<Link to="/category">카테고리 필터링</Link>

useNavigate는 Hook으로, 코드 안에서 원하는 시점에 페이지를 이동시킬 수 있다. 이번 과제에서는 Navbar 버튼에 사용했다.

const navigate = useNavigate();
<button onClick={() => navigate(“/category”)}>카테고리 필터링</button>

단순히 클릭해서 이동하는 링크라면 Link를, 버튼을 누른 뒤 어떤 처리를 하고 이동하거나 조건에 따라 이동해야 한다면 useNavigate를 쓰는 게 좋다고 이해했다.

# 일반 CSS / CSS Modules / Tailwind CSS

### 일반 CSS
1주차처럼 css 파일을 만들고 클래스 이름으로 스타일을 지정하는 방식이다. 익숙하고 단순하지만, 모든 스타일이 전역으로 적용되기 때문에 다른 컴포넌트에서 같은 클래스 이름을 쓰면 스타일이 서로 덮어씌워질 수 있다. 프로젝트가 커질수록 클래스 이름 관리가 어려워진다.

### CSS Modules
파일 이름을 Button.module.css처럼 만들면, 그 안의 클래스 이름이 빌드할 때 자동으로 고유한 이름으로 바뀐다. 그래서 다른 컴포넌트와 클래스 이름이 겹쳐도 충돌하지 않고, 컴포넌트 단위로 스타일을 관리할 수 있다.

import styles from “./Button.module.css”;
<button className={styles.button}>버튼</button>

대신 styles.button처럼 객체로 접근해야 해서 조금 번거롭다.

### Tailwind CSS
미리 만들어진 유틸리티 클래스를 className에 조합해서 바로 스타일을 적용하는 방식이다. 따로 css 파일을 만들거나 클래스 이름을 짓지 않아도 된다.

<button className="bg-blue-500 text-white rounded-md px-4 py-2">장바구니</button>

빠르게 스타일을 적용할 수 있고 정해진 값을 쓰기 때문에 디자인이 일관되지만, className이 길어져서 코드가 복잡해 보일 수 있고 클래스 이름을 익숙해질 때까지 찾아봐야 한다.

이번 과제에서는 기존 1주차 화면은 일반 CSS를 그대로 두고, 새로 만든 상품 카드와 필터 페이지는 Tailwind로 작성했다. Vite 프로젝트에 tailwindcss와 @tailwindcss/vite를 설치하고, vite.config.js에 플러그인을 추가한 뒤 index.css에 @import “tailwindcss”;를 넣어서 적용했다.