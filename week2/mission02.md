1. React Router
SPA(Single Page Application)은 하나의 html 페이지를 기반으로 여러 화면을 보여주는 웹 애플리케이션 구조이다. 페이지를 이동할 때마다 html 문서 전체를 새로 받아오는 것이 아니라, 필요한 화면 부분을 react가 변경해준다. 화면을 바꿀때 서버에 새로운 html 페이지를 요청하는 것이 아닌 브라우저에서 url과 화면을 바꾸는 방식을 클라이언트 사이드 라우팅이라고 한다.
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
위 코드에서 보면 BrowserRouter가 브라우저의 url을 기반으로 라우팅을 관리하고 routes가 여러 라우트들을 관리하며 route에서 url과 컴포넌트를 연결시켜준다.
Link는 사용자가 특정 요소를 클릭했을 때 다른 페이지로 이동하도록 만드는 컴포넌트이다. Link는 a와 다르게 페이지 전체를 새로 불러오지 않고 이동한다. useNavigate는 특정사건이 아닌 특정조건을 충족시켰을 때 특정 페이지로 이동시키는 기능을 한다.
2. 일반 CSS와 CSS Modules, Tailwind CSS의 차이
일반 css는 별도의 css파일을 만들고 클래스 이름을 지정해서 스타일을 적용하는 방식이다. css Modules는 css와 작성방법은 같지만 css 클래스 이름이 컴포넌트별로 독립적으로 적용되는 방식이다. 이는 클래스 이름 충돌을 방지할 수 있다. Tailwind css는 앞의 두 방식과 달리 html 또는 jsx의 className에 미리 정의된 css유틸리티 클래스를 직접 작성하는 방식이다. css 파일을 오가며 작성할 필요가 없어 간편한 대신 className이 길어지는 소요가 있다.