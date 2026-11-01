function Content() {
  const search = () => {
    const input = document.querySelector("#searcher input");
    console.log(input.value);
  };
  return (
    <div class="content">
      <div id="searcher">
        <input type="text" placeholder="상품 검색..."/>
        <button onClick={search}>검색</button>
      </div>

      <img src="/gdg-favicon.svg"/>
      <p>검색 결과가 없습니다.</p>
    </div>
  )
}

export default Content;