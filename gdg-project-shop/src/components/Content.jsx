import { useState } from "react";
import Item from "./Item.jsx";
import { itemData } from "../data/mockData.js";

function Content({ cart, onAddToCart }) {
  const [keyword, setKeyword] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const filteredItems = itemData.filter((item) =>
    item.itemName.includes(searchWord.trim())
  );

  return (
    <main className="content">
      <div className="search-bar">
        <input
          type="text"
          placeholder="상품 검색..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={() => setSearchWord(keyword)}>검색</button>
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-result">
          <img className="empty-logo" src="/gdg-favicon.svg" alt="gdg 로고" />
          <p>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-xl flex-col gap-6 p-6">
          {filteredItems.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              itemName={item.itemName}
              price={item.price}
              quantity={item.quantity}
              cart={cart}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Content;