import { useState } from 'react';

import { itemData } from '../data/mockData.js';
import ProductList from '../components/ProductList.jsx';

function Sort({ cart, addToCart }) {
  const [sortType, setSortType] = useState("name");

  const sortedItems = [...itemData].sort((a, b) => {
    if (sortType === "name") {
      return a.itemName.localeCompare(b.itemName, "ko");
    }

    if (sortType === "priceAsc") {
      return a.price - b.price;
    }

    if (sortType === "priceDesc") {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <div className="sort-page">
      <select
        value={sortType}
        onChange={(event) => setSortType(event.target.value)}
      >
        <option value="name">이름순 (가나다순)</option>
        <option value="priceAsc">가격 낮은순</option>
        <option value="priceDesc">가격 높은순</option>
      </select>

      <ProductList
        items={sortedItems}
        cart={cart}
        addToCart={addToCart}
      />
    </div>
  );
}

export default Sort;