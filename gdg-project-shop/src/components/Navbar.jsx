import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const NavButton = (event) => {
    const buttonText = event.currentTarget.innerText;

    if (buttonText === "가격 범위 필터링") {
      navigate('/price');
    }
    else if (buttonText === "상품 정렬") {
      navigate('/sort');
    }
    else if (buttonText === "카테고리 필터링") {
      navigate('/category');
    }
  }

  return (
    <header className="header">
      <a href="#" onClick={(event) => {
        event.preventDefault();
        navigate('/');
      }}>
        <img src="/gdg-favicon.svg" alt="gdg-favicon" />
      </a>

      <div>
        <button onClick={NavButton}>가격 범위 필터링</button>
        <button onClick={NavButton}>상품 정렬</button>
        <button onClick={NavButton}>카테고리 필터링</button>
      </div>

      <button className="btn1">관리자</button>
    </header>
  );
}

export default Navbar;