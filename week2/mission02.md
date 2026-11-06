React Router

- 라우팅 : 사용자가 요청한 URL에 따라 알맞은 페이지를 보여주는 것을 의미
- 웹 애플리케이션은 대부분의 경우 여러 페이지로 구성.
- 리액트는 SPA로 동작, 여러 컴포넌트로 하나의 페이지에 표시

대표적인 태그는 크게 라우터 설정 태그랑 라우트 정의 태그로 나뉨.

1. 라우터 설정 태그
BrowserRouter : HTML5 Histori API로 깔끔한 URL을 유지, 가장 표준적으로 사용되는 라우터.

HashRouter : URL에 해시를 포함. 서버 설정이 따로 필요없는 정적 웹 호스팅 등에 적합하지만, 검색엔진 최적화에는 불리함.

2. 라우트 정의 태그
Routes : 1st 경로를 찾아 렌더링

Route : 특정 경로와 렌더링할 컴포넌트를 연결

Outlet : 중첩된 라우팅 구조에서 부모 라우트 내 자식 라우트의 컴포넌트가 렌더링 되도록 자리를 잡는 역할

예시 :

import { NavLink } from "react-router";

function MainPage() {
    return (
        <div className="text-3xl">
            <div className="flex">
                <NavLink to="/about">About</NavLink>
            </div>
            <div>Main Page</div>
        </div>
    );
}

export default MainPage;

NavLink를 가져오는 줄 사용, 여기서 NavLink는 URL경로가 일치할 때 active 스타일을 적용하는 컴포넌트

import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
// 페이지를 필요할 때만 로딩하기 위해 lazy와 Suspense 사용
const Loading = () => <div>Loading...</div>
const Main = lazy(() => import("../pages/main-page"));
const About = lazy(() => import("../pages/aboutPage"));

const router = createBrowserRouter([
  {
    path: "",
    element: <Suspense fallback={<Loading />}><Main /></Suspense>,
  },
  {
    path: "about",
    element: <Suspense fallback={<Loading />}><About /></Suspense>,
  }
]);

export default router;

CSS, CSS Module, TailwindCSS 비교

CSS

방식 : 순수 CSS 파일 작성

클래스명 충돌 : 수동 관리

파일 구조 : HTML과 분리

생산성 : 보통

장점 : 브라우저가 그대로 이해

단점 : 큰 프로젝트 시 클래스 이름 중복 현상

CSS Module

방식 : 파일별로 스코프(범위)가 제한된 CSS 작성

클래스명 충돌 : 빌드 시 고유 해시로 자동 방지

파일 구조 : 컴포넌트별로 .module.css 파일 생성

생산성 : 보통

장점 : 전통적인 CSS 문법(.color, .background 등)을 그대로 쓰면서도 클래스 이름 충돌을 원천 차단

단점 : 컴포넌트마다 스타일 파일을 따로 만들어야 해서 파일 수 증가

TailwindCSS

방식 : 미리 정의된 유틸리티 클래스를 조합

클래스명 충돌 : 유틸리티 클래스 기반이라 충돌 위험 낮음

파일 구조 : HTML/JSX 안에 직접 클래스 작성

생산성 : 매우 빠름

장점 : 작명 스트레스 없고, 파일 이동이 불필요, 최적화

단점 : HTML/JSX 코드에 클래스 명이 길게 나열되어 가독성 감소 우려