function Navbar() {
    return (
        <nav>
            <img src='/gdg-logo.svg' />
            <div>
                <button onClick={() => console.log("카테고리 필터링 클릭")}>카테고리 필터링</button>
                <button onClick={() => console.log("가격 범위 필터링 클릭")}>가격 범위 필터링</button>
                <button onClick={() => console.log("상품 정렬 클릭")}>상품 정렬</button>
            </div>
            <button className="administer">관리자</button>
        </nav>
    );
}

export default Navbar;