import { useState } from "react";
import { itemData } from "../data/mockData";
import Item from "../components/Item";

function CategoryPage({ cart, onAddToCart }) {
  const [category, setCategory] = useState("");

  const filteredItems =
    category === "" ? itemData : itemData.filter((item) => item.category === category);

  return (
    <main className="content">
      <div className="w-[480px] max-w-[90%] flex flex-col gap-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-40 border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
        >
          <option value="">카테고리 선택</option>
          <option value="의류">의류</option>
          <option value="전자기기">전자기기</option>
          <option value="화장품">화장품</option>
          <option value="식품">식품</option>
        </select>

        {filteredItems.map((item) => (
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

export default CategoryPage;