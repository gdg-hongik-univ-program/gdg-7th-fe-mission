import { useState } from 'react';

import { itemData } from '../data/mockData.js';
import ProductList from '../components/ProductList.jsx';

function Price({ cart, addToCart }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 잘못된 가격 범위인지 확인
  const isInvalid =
    (minPrice !== "" && Number(minPrice) < 0) ||
    (maxPrice !== "" && Number(maxPrice) < 0) ||
    (
      minPrice !== "" &&
      maxPrice !== "" &&
      Number(minPrice) > Number(maxPrice)
    );

  // 가격 범위에 맞는 상품 필터링
  const filteredItems = itemData.filter((item) => {
    if (isInvalid) {
      return false;
    }

    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);

    return item.price >= min && item.price <= max;
  });

  return (
    <div className="price-page">
      <div className="price-filter">
        <input
          type="number"
          min="0"
          step="1"
          placeholder="최소 가격"
          value={minPrice}
          onChange={(event) => setMinPrice(event.target.value)}
        />

        <span>~</span>

        <input
          type="number"
          min="0"
          step="1"
          placeholder="최대 가격"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
        />
      </div>

      {isInvalid ? (
        <p className="error-message">
          올바른 가격 범위를 입력해 주세요.
        </p>
      ) : (
        <ProductList
          items={filteredItems}
          cart={cart}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

export default Price;