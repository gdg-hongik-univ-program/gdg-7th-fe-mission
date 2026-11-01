export default function Navbar(){
    function handleClick(buttonText){
        console.log(buttonText);
    };

    return(
        <nav className="navBar">
            <a href="/">
                <img
                    src="/gdg-logo.svg"
                    alt="gdg 로고"
                />
            </a>
            <div>
                <button className="menuButton" onClick={() => handleClick("가격 범위 필터링 클릭")}>가격 범위 필터링</button>
                <button className="menuButton" onClick={() => handleClick("상품 정렬 클릭")}>상품 정렬</button>
                <button className="menuButton" onClick={() => handleClick("카테고리 필터링 클릭")}>카테고리 필터링</button>
            </div>
            <button className="adminButton">관리자</button>
        </nav>
    )
}