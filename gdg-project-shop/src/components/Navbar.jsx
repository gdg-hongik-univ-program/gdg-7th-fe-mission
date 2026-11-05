import { useNavigate } from "react-router";

function Navbar() {
  const goHome = useNavigate();
  const goCategory = useNavigate();
  const goPrice = useNavigate();
  const goSort = useNavigate();

  return (
    <nav className="navbar">
      <button onClick={() => goHome("/")}>
        <img src="/gdg-favicon.svg" alt="gdg 로고" />
      </button>

      <div className="navbar-filters">
        <button className="filter-button" onClick={() => goCategory("/category")}>
          카테고리 필터링
        </button>
        <button className="filter-button" onClick={() => goPrice("/price")}>
          가격 범위 필터링
        </button>
        <button className="filter-button" onClick={() => goSort("/sort")}>
          상품 정렬
        </button>
      </div>

      <button className="admin-button" onClick={() => console.log("관리자 버튼 클릭")}>
        관리자
      </button>
    </nav>
  );
}

export default Navbar;