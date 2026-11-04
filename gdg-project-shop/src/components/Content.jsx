function Content() {
  return (
    <main className="content">
      <div className="search-box">
        <input type="text" placeholder="상품 검색" className="search-input" />
        <button className="search-button">검색</button>
      </div>
 
      <div className="empty-result">
        <img src="/gdg-favicon.svg" alt="GDG 로고" className="empty-logo" />
        <p>검색 결과가 없습니다</p>
      </div>
    </main>
  );
}
 
export default Content;
 