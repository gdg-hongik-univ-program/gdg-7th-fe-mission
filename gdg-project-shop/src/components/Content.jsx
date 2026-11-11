import { useState } from "react";

function Content() {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    console.log(keyword);
  };

  return (
    <main className="content">
      <div className="search-bar">
        <input
          type="text"
          placeholder="상품 검색..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <section className="empty">
        <img src="/gdg-logo.svg" alt="" className="empty-logo" />
        <p>검색 결과가 없습니다.</p>
      </section>
    </main>
  );
}

export default Content;