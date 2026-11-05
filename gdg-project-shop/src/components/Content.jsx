import { useState } from "react";
import ItemList from "./ItemList";
import { itemData } from "../data/mockData";

function Content() {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    setKeyword(search);
  };

  const filteredItems = itemData.filter((item) =>
    item.itemName.includes(keyword)
  );

  return (
    <main className="content">
      {/* 검색 영역 */}
      <div className="search-area">
        <input
          type="text"
          placeholder="상품 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {filteredItems.length > 0 ? (
        <ItemList items={filteredItems} />
      ) : (
        <div className="empty-result">
          <img src="/gdg-logo.svg" alt="GDG Logo" />
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </main>
  );
}

export default Content;