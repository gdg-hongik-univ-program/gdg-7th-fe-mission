import { useNavigate } from 'react-router'

export default function Navbar(){
    const navigate = useNavigate();

    return(
        <nav className="navBar">
            <button onClick={() => navigate("/")}>
                <img src="/gdg-logo.svg" alt="gdg 로고 (홈으로)" />
            </button>
            <div className="flex gap-6">
                <button className="menuButton" onClick={() => navigate("/category")}>카테고리 필터링</button>
                <button className="menuButton" onClick={() => navigate("/price")}>가격 범위 필터링</button>
                <button className="menuButton" onClick={() => navigate("/sort")}>상품 정렬</button>
            </div>
            <button className="adminButton">관리자</button>
        </nav>
    )
}