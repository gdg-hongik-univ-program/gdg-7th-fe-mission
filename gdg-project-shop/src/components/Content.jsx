import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { getProducts } from "../apis/products";
import LoadingMessage from "../messages/LoadingMessage";
import ErrorMessage from "../messages/ErrorMessage";

function Content() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        if (!ignore) setItems(data);
      } catch (e) {
        if (!ignore) setError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

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