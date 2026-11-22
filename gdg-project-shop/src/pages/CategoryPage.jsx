import { useState } from "react";
import ItemList from "../components/ItemList";

const categories = ["의류", "전자기기", "화장품", "식품"];

export default function CategoryPage({ products }) {
  const [selected, setSelected] = useState(""); // 고른 카테고리
  const [isOpen, setIsOpen] = useState(false); // 목록 열림 여부

  const items = products.filter((item) => item.category === selected);

  function handleSelect(category) {
    setSelected(category);
    setIsOpen(false);
  }

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-12">
      {/* 카테고리 선택 창 (항상 보임) */}
      <div className="relative w-48">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-full rounded-md border-2 border-black bg-white px-3 text-left text-sm"
        >
          {selected === "" ? (
            <span className="text-gray-400">카테고리 선택</span>
          ) : (
            <span className="text-black">{selected}</span>
          )}
        </button>

        {isOpen && (
          <ul className="absolute left-0 top-full z-10 w-full">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleSelect(category)}
                  className="h-10 w-full rounded-md border border-gray-400 bg-gray-200 px-3 text-left text-sm text-black"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 골랐을 때만 결과 보여 주기 */}
      {selected !== "" && <ItemList items={items} />}
    </section>
  );
}
