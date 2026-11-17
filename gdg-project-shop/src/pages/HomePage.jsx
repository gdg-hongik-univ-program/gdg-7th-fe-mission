import { useState } from "react";
import Item from "../components/Item";
import { searchProduct } from "../apis/products";

function HomePage({ products }) {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async () => {
    if (keyword.trim() === "") {
      setSearchResult(null);
      setSearchError("");
      return;
    }

    try {
      const result = await searchProduct(keyword.trim());
      setSearchResult(result);
      setSearchError("");
    } catch (err) {
      setSearchResult(null);
      setSearchError(err.message);
    }
  };

  const list = searchResult ? [searchResult] : products;

  return (
    <main className="content">
      <div className="w-[480px] max-w-[90%] flex flex-col gap-6">
        <div className="flex gap-3 mb-4">
          <input
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
            placeholder="상품명 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="w-24 bg-blue-500 text-white rounded-md text-sm"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>

        {searchError ? (
          <p className="text-center text-gray-500">{searchError}</p>
        ) : (
          list.map((item) => <Item key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
}

export default HomePage;
