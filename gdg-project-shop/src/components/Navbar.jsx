import { useNavigate } from 'react-router';

function Navbar() {
    let navigate = useNavigate();
    return (
        <nav>
            <img src='/gdg-logo.svg' onCLick={navigate("/home")} />
            <div>
                <button onClick={navigate("/category")}>카테고리 필터링</button>
                <button onClick={navigate("/filter-cost-range")}>가격 범위 필터링</button>
                <button onClick={navigate("/sort-items")}>상품 정렬</button>
            </div>
            <button className="administer">관리자</button>
        </nav>
    );
}

export default Navbar;