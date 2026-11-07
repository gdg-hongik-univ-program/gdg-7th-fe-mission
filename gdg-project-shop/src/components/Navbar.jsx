import {useNavigate, Link} from "react-router";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src="/gdg-favicon.svg" width="40px"/>
      </Link>
      
      <div>
        <button onClick={() => navigate("/category")}>카테고리 필터링</button>
        <button onClick={() => navigate("/price-bound")}>가격 범위 필터링</button>
        <button onClick={() => navigate("/sort")}>상품 정렬</button>
      </div>
      <button id="manage">관리자</button>
    </nav>
  )
}

export default Navbar;