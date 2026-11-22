import { useState } from 'react';
import ProductList from './ProductList.jsx';

function Content({ items, cart, addToCart }) {
  const [searchText, setSearchText] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchText.trim() === '') {
      setIsSearched(false);
      return;
    }

    setIsSearched(true);
  };

  const filteredItems = items.filter((item) =>
    item.itemName.includes(searchText.trim())
  );

  return (
    <main className="content">
      {/* 로고 워터마크 */}
      <div className="watermark"></div>

      {/* 검색 영역 */}
      <div className="search-area">
        <form className="input-group" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="상품 입력..."
            value={searchText}
            onChange={(event) => {
              const value = event.target.value;
              setSearchText(value);

              if (value.trim() === '') {
                setIsSearched(false);
              }
            }}
          />

          <button type="submit" className="btn2">
            검색
          </button>
        </form>

        {/* 검색 결과 */}
        {isSearched && filteredItems.length > 0 ? (
          <ProductList
            items={filteredItems}
            cart={cart}
            addToCart={addToCart}
          />
        ) : (
          isSearched && <p className="no-result">검색 결과가 없습니다.</p>
        )}
      </div>
    </main>
  );
}

export default Content;
