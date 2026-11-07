import { useState } from "react";
import { itemData } from "../data/mockData";
import Item from "../components/Item";

function SortPage({ cart, onAddToCart }) {
  const [sortKey, setSortKey] = useState("");

  const sortedItems = [...itemData].sort((a, b) => {
    if (sortKey === "name") return a.itemName.localeCompare(b.itemName, "ko");
    if (sortKey === "price") return a.price - b.price;
    return 0;
  });

  return (
    <main className="content">
      <div className="w-[480px] max-w-[90%] flex flex-col gap-6">
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="w-40 border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
        >
          <option value="">정렬 기준 선택</option>
          <option value="name">이름순</option>
          <option value="price">가격순</option>
        </select>

        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            isInCart={cart.some((c) => c.id === item.id)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </main>
  );
}

export default SortPage;