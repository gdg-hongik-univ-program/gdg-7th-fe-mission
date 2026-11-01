function Navbar() {
  const outPut = (e) => {
    console.log(e.target.textContent);
  }

  return (
    <nav class="navbar">
      <a href="https://docs.gdghongik.com/" title="gdg-hongik">
        <img class="logo" src="/gdg-favicon.svg" width="40px"/>
      </a>
      <div>
        <button onClick={outPut}>카테고리 필터링</button>
        <button onClick={outPut}>가격 범위 필터링</button>
        <button onClick={outPut}>상품 정렬</button>
      </div>
      <button id="manage">관리자</button>
    </nav>
  )
}

export default Navbar;