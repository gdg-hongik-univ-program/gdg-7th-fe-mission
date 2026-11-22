import Item from "../components/Item";
import CategorySelect from "../components/CategorySelect.jsx";
import { useState } from "react";

function Category({ item }) {
  const [category, setCategory] = useState("카테고리 선택");

  const filterItem_C = category
    ? item.filter((item) => item.category === category)
    : [];

  return (
    <div className="flex flex-col items-center p-3">
      <CategorySelect
        category={category}
        onSelect={setCategory}
        width="w-[150px]"
      />

      <div className="flex flex-col items-center gap-3 pt-3">
        {filterItem_C.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Category;
