import { useState } from "react";
import { CATEGORIES } from "../utils/constants.js";

// 카테고리 드롭다운 (Category 페이지, 상품 등록 폼 공통)
// width: 버튼 너비 Tailwind 클래스
function CategorySelect({ category, onSelect, width }) {
  const [isOpen, setOpen] = useState(false);

  const handleClick = (name) => {
    onSelect(name);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!isOpen)}
        className={`border bg-white rounded-md cursor-pointer ${width} text-sm`}
      >
        {category}
      </button>
      {isOpen &&
        CATEGORIES.map((name) => (
          <button
            key={name}
            onClick={() => handleClick(name)}
            className={`border bg-gray-200 rounded-md cursor-pointer ${width} text-sm`}
          >
            {name}
          </button>
        ))}
    </>
  );
}

export default CategorySelect;
