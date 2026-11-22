import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 '/admin'인지 확인
  const isAdminPage = location.pathname === '/admin';

  const NavButton = (event) => {
    const buttonText = event.currentTarget.innerText;

    if (buttonText === '가격 범위 필터링') {
      navigate('/price');
    } else if (buttonText === '상품 정렬') {
      navigate('/sort');
    } else if (buttonText === '카테고리 필터링') {
      navigate('/category');
    }
  };

  return (
    <header className="header">
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          navigate('/');
        }}
      >
        <img src="/gdg-favicon.svg" alt="gdg-favicon" />
      </a>

      {/* 소비자 페이지일 때만 필터링/정렬 메뉴 노출 */}
      {!isAdminPage && (
        <div>
          <button onClick={NavButton}>가격 범위 필터링</button>
          <button onClick={NavButton}>상품 정렬</button>
          <button onClick={NavButton}>카테고리 필터링</button>
        </div>
      )}

      {/* 경로에 따라 '소비자' <-> '관리자' 버튼 전환 */}
      {isAdminPage ? (
        <button className="btn1" onClick={() => navigate('/')}>
          소비자
        </button>
      ) : (
        <button className="btn1" onClick={() => navigate('/admin')}>
          관리자
        </button>
      )}
    </header>
  );
}

export default Navbar;
