import { useNavigate } from 'react-router';

function Navbar() {
    let navigate = useNavigate();
    return (
        <>
            <nav>
                <button onClick={() => navigate("/")}><img src='/gdg-logo.svg' /></button>
                <div>
                    <button onClick={() => navigate("/category")}>카테고리 필터링</button>
                    <button onClick={() => navigate("/filter-price-range")}>가격 범위 필터링</button>
                    <button onClick={() => navigate("/sort-items")}>상품 정렬</button>
                </div>
                <button className="administer">관리자</button>
            </nav>
            <hr className="opacity-20" />
        </>
    );
}

export default Navbar;