function Navbar() {
  return (
    <nav className="navbar">
      <img src="/gdg-favicon.svg" alt="GDG 로고" className="navbar-logo" />
      <ul className="navbar-menu">
        <li>카테고리 필터링</li>
        <li>가격 범위 필터링</li>
        <li>상품 정렬</li>
      </ul>
      <button className="navbar-button">로그인</button>
    </nav>
  );
}
 
export default Navbar;