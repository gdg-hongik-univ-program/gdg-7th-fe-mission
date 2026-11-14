import { useNavigate, useLocation } from 'react-router';

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isManagement = pathname === '/management';

  return (
    <nav className="navbar">
      <img
        className="navbar-logo"
        src="/gdg-logo.svg"
        alt="GDG Logo"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      />

      {/* 관리자 페이지에서는 필터 버튼을 숨김 */}
      {!isManagement && (
        <div className="filter-buttons">
          <button
            className={pathname === '/category' ? 'active' : ''}
            onClick={() => navigate('/category')}
          >
            카테고리 필터링
          </button>

          <button
            className={pathname === '/price' ? 'active' : ''}
            onClick={() => navigate('/price')}
          >
            가격 범위 필터링
          </button>

          <button
            className={pathname === '/sort' ? 'active' : ''}
            onClick={() => navigate('/sort')}
          >
            상품 정렬
          </button>
        </div>
      )}

      <button
        className="admin-button"
        onClick={() => navigate(isManagement ? '/' : '/management')}
      >
        {isManagement ? '소비자' : '관리자'}
      </button>
    </nav>
  );
}

export default Navbar;