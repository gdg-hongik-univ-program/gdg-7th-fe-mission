import { useNavigate, useLocation } from 'react-router';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <nav>
                <button onClick={() => navigate("/")}><img src='/gdg-logo.svg' /></button>

                {location.pathname!="/admin" && (
                    <div>
                        <button onClick={() => navigate("/category")}>카테고리 필터링</button>
                        <button onClick={() => navigate("/filter-price-range")}>가격 범위 필터링</button>
                        <button onClick={() => navigate("/sort-items")}>상품 정렬</button>
                    </div>
                )}
                {location.pathname!="/admin" ? (
                    <button className="administer" onClick={() => navigate("/admin")}>관리자</button>
                ) : (
                    <button className="buyer" onClick={() => navigate("/")}>소비자</button>

                )}
            </nav>
            <hr className="opacity-20" />
        </>
    );
}

export default Navbar;