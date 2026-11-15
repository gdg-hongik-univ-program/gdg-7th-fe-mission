import { useNavigate, useLocation } from 'react-router-dom';
 

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
 
  return (
    <nav className="navbar">
      <img
        src="/gdg-favicon.svg"
        alt="GDG 로고"
        className="navbar-logo cursor-pointer"
        onClick={() => navigate('/')}
      />
      {!isAdminPage && (
        <ul className="navbar-menu">
          <li className="cursor-pointer" onClick={() => navigate('/category')}>카테고리 필터링</li>
          <li className="cursor-pointer" onClick={() => navigate('/price')}>가격 범위 필터링</li>
          <li className="cursor-pointer" onClick={() => navigate('/sort')}>상품 정렬</li>
        </ul>
      )}
      <button
        className="navbar-button"
        onClick={() => navigate(isAdminPage ? '/' : '/admin')}>
          {isAdminPage ? '소비자' : '관리자'}
        </button>
    </nav>
  );
}

export default Navbar;