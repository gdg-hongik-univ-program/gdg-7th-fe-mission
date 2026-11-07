import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <button onClick={() => navigate("/")}>
        <img src="/gdg-logo.svg" alt="GDG 홈으로" className="navbar-logo" />
      </button>

      <nav className="navbar-menu">
        <button onClick={() => navigate("/category")}>카테고리 필터링</button>
        <button onClick={() => navigate("/price")}>가격 범위 필터링</button>
        <button onClick={() => navigate("/sort")}>상품 정렬</button>
      </nav>

      <button className="navbar-admin">관리자</button>
    </header>
  );
}

export default Navbar;
