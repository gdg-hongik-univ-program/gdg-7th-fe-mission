import { useState } from "react";
import Item from "../components/Item.jsx";
import { itemData } from "../data/mockData.js";

function PricePage({ cart, onAddToCart }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleChange(event, setPrice) {
    const value = event.target.value;

    if (value === "" || /^\d+$/.test(value)) {
      setPrice(value);
    }
  }

  const min = minPrice === "" ? 0 : Number(minPrice);
  const max = maxPrice === "" ? Infinity : Number(maxPrice);
  const isInvalid = min > max;

  const filteredItems = isInvalid
    ? []
    : itemData.filter((item) => item.price >= min && item.price <= max);

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 p-6">
      <div className="flex gap-3">
        <input
          type="text"
          inputMode="numeric"
          placeholder="최소 가격"
          value={minPrice}
          onChange={(event) => handleChange(event, setMinPrice)}
          className="w-36 rounded-md border border-gray-300 px-3 py-2"
        />
        <input
          type="text"
          inputMode="numeric"
          placeholder="최대 가격"
          value={maxPrice}
          onChange={(event) => handleChange(event, setMaxPrice)}
          className="w-36 rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {isInvalid && (
        <p className="text-red-500">최소 가격은 최대 가격보다 클 수 없습니다.</p>
      )}

      {!isInvalid && filteredItems.length === 0 && (
        <p className="text-gray-500">해당 가격의 상품이 없습니다.</p>
      )}

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
  );
}

export default PricePage;