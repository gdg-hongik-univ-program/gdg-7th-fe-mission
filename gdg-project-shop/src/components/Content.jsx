import { useState } from 'react';
import { itemData } from '../data/mockData.js';
import ProductList from './ProductList.jsx';

function Content({ cart, addToCart }) {
  const [searchText, setSearchText] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    setIsSearched(true);
  };

  const filteredItems = itemData.filter((item) =>
    item.itemName.includes(searchText.trim())
  );

  return (
    <main className="content">
      <form className="input-group" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="상품 입력..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button type="submit" className="btn2">
          검색
        </button>
      </form>

      {isSearched && (
        filteredItems.length > 0 ? (
          <ProductList
            items={filteredItems}
            cart={cart}
            addToCart={addToCart}
          />
        ) : (
          <p>검색 결과가 없습니다.</p>
        )
      )}
    </main>
  );
}

export default Content;