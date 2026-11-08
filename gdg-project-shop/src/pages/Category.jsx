import { useState } from 'react';

import { itemData } from '../data/mockData.js';
import ProductList from '../components/ProductList.jsx';

function Category({ cart, addToCart }) {
  const [category, setCategory] = useState("");

  const filteredItems = itemData.filter((item) => {
    if (category === "") {
      return true;
    }

    return item.category === category;
  });

  return (
    <div className="category-page">
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="">카테고리 선택</option>
        <option value="의류">의류</option>
        <option value="전자기기">전자기기</option>
        <option value="화장품">화장품</option>
        <option value="식품">식품</option>
      </select>

      <ProductList
        items={filteredItems}
        cart={cart}
        addToCart={addToCart}
      />
    </div>
  );
}

export default Category;