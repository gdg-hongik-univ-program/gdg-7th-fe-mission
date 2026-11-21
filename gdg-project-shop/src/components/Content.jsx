import ItemList from "./ItemList";
import LoadingMessage from "../messages/LoadingMessage";
import ErrorMessage from "../messages/ErrorMessage";
import {useProducts} from "../hooks/useProducts";
import { useState } from "react";

function Content() {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const { items, loading, error } = useProducts();



  const handleSearch = () => {
    setKeyword(search);
  };

  const filteredItems = items.filter((item) =>
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

      {loading ? (
        <LoadingMessage />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <ItemList items={filteredItems} />
      )}
    </main>
  );
}

export default Content;