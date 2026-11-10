function Home() {
    const click = () => {
        const val = document.querySelector("#search").value
        console.log(val);
    };

    return (
        <div className="content">
            <div className="form">
                <input type="search" id="search" placeholder="상품 검색..."></input>
                <button onClick={click}>검색</button>
            </div>
            <img src='/gdg-logo.svg' />
            <p className="result">검색 결과가 없습니다. </p>
        </div>
    );
}

export default Home;