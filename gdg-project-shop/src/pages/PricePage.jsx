import { useState } from "react";
import ItemList from "../components/ItemList";

export default function PricePage({ products }) {
  const [minInput, setMinInput] = useState(""); // 최소 가격 입력값
  const [maxInput, setMaxInput] = useState(""); // 최대 가격 입력값
  const [range, setRange] = useState(null); // 검색 버튼을 눌렀을 때 정해진 범위

  // 숫자만 입력되게
  function onlyNumber(value, setValue) {
    if (/^\d*$/.test(value)) setValue(value);
  }

  function handleSearch() {
    const min = minInput === "" ? 0 : Number(minInput); // 비우면 0원부터
    const max = maxInput === "" ? Infinity : Number(maxInput); // 비우면 끝까지

    if (min > max) {
      alert("최소 가격이 최대 가격보다 클 수 없어요.");
      return;
    }

    setRange({ min, max });
  }

  const items =
    range === null
      ? []
      : products.filter(
          (item) => item.price >= range.min && item.price <= range.max,
        );

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-12">
      {/*  가격 입력 + 검색 */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={minInput}
          onChange={(e) => onlyNumber(e.target.value, setMinInput)}
          className="h-10 min-w-0 flex-1 rounded-md border border-gray-400 px-3 text-sm text-black"
        />
        <input
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={maxInput}
          onChange={(e) => onlyNumber(e.target.value, setMaxInput)}
          className="h-10 min-w-0 flex-1 rounded-md border border-gray-400 px-3 text-sm text-black"
        />
        <button
          onClick={handleSearch}
          className="h-10 whitespace-nowrap rounded-md bg-blue-500 px-10 text-sm text-white"
        >
          검색
        </button>
      </div>

      {/* 검색했을 때만 결과 보여 주기 */}
      {range !== null && (
        <ItemList items={items} emptyMessage="해당 가격대의 상품이 없어요." />
      )}
    </section>
  );
}
