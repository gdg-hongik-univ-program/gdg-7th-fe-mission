import { useState } from "react";
import { searchProduct } from "../apis/products.js";
import Item from "../components/Item.jsx";

function Home({ addToCart, cart }) {
  const [keyWord, setKeyWord] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  async function handleSearch() {
    const name = keyWord.trim();
    if (!name) return;

    try {
      setError(null);
      const result = await searchProduct(name); // 문자열로 전달
      setResults(result); // 화면에 반영
    } catch (err) {
      setError(err.message);
      setResults([]);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 p-3">
      <div className="flex items-center gap-3">
        <input
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder="상품 검색..."
          className="bg-white border placeholder:text-sm rounded-2xl w-[450px] h-[30px]"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 w-10 h-[30px] rounded-2xl text-white text-sm"
        >
          검색
        </button>
      </div>

      <div className="flex flex-col items-center rounded-2xl gap-4 p-2">
        {error && <p className="text-red-500">{error}</p>}
        {results.length === 0 ? (
          <>
            <img
              src="/gdg-favicon.svg"
              className="w-[400px] h-auto opacity-15"
            />
            <p>검색 결과가 없습니다</p>
          </>
        ) : (
          results.map((item) => (
            <Item key={item.id} item={item} addToCart={addToCart} cart={cart} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
