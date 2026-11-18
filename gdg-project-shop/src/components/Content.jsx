import { useState } from 'react';
import Item from './Item';
import { searchProduct } from '../apis/products';

function Content({ items, cart, setCart }) {
  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const handleSearch = async () => {
    if (keyword === '') {
      setSearchResult(null);
      return;
    }
    try {
      const data = await searchProduct(keyword);
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      alert('상품을 찾을 수 없어요');
    }
  };

  const showItems = searchResult === null ? items : [searchResult];

  return (
    <main className="content">
      <div className="search-box">
        <input
          type="text"
          placeholder="상품 검색"
          className="search-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>검색</button>
      </div>

      <div className="max-w-3xl mx-auto mt-6">
        {showItems.map((item) => (
          <Item key={item.id} item={item} cart={cart} setCart={setCart} />
        ))}
      </div>
    </main>
  );
}

export default Content;
 