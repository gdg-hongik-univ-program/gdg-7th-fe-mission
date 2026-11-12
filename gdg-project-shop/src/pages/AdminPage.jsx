import { useState } from "react";

const categories = ["의류", "전자기기", "화장품", "식품"];
const inputClass =
  "w-full rounded-md border border-gray-400 px-3 py-2 text-sm placeholder:text-gray-400";
const boxClass = "rounded-lg border border-gray-400 p-6";
const buttonClass = "w-36 rounded-md py-1.5 text-white";

function isPositiveNumber(value) {
  return /^\d+$/.test(value) && Number(value) > 0;
}

function Field({ label, children }) {
  return (
    <label className="flex items-center gap-4">
      <span className="w-20 shrink-0 whitespace-nowrap">{label}</span>
      {children}
    </label>
  );
}

function AdminPage() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [stockName, setStockName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const [deleteName, setDeleteName] = useState("");

  function handleRegister() {
    if (!itemName.trim() || !price || !quantity || !category) {
      alert("상품명, 가격, 수량, 카테고리를 모두 입력해 주세요.");
      return;
    }
    if (!isPositiveNumber(price)) {
      alert("가격은 1 이상의 숫자로 입력해 주세요.");
      return;
    }
    if (!isPositiveNumber(quantity)) {
      alert("수량은 1 이상의 숫자로 입력해 주세요.");
      return;
    }

    const newItem = {
      itemName: itemName.trim(),
      price: Number(price),
      quantity: Number(quantity),
      category,
    };
    console.log("상품이 등록되었습니다.", newItem);

    setItemName("");
    setPrice("");
    setQuantity("");
    setCategory("");
  }

  function handleAddStock() {
    if (!stockName.trim() || !stockQuantity) {
      alert("상품명과 추가할 수량을 모두 입력해 주세요.");
      return;
    }
    if (!isPositiveNumber(stockQuantity)) {
      alert("추가할 수량은 1 이상의 숫자로 입력해 주세요.");
      return;
    }

    const stock = { itemName: stockName.trim(), quantity: Number(stockQuantity) };
    console.log("재고가 추가되었습니다.", stock);

    setStockName("");
    setStockQuantity("");
  }

  function handleDelete() {
    if (!deleteName.trim()) {
      alert("삭제할 상품명을 입력해 주세요.");
      return;
    }

    const target = { itemName: deleteName.trim() };
    console.log("상품이 삭제되었습니다.", target);

    setDeleteName("");
  }

  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col gap-12 px-4 py-6 text-left text-[15px] text-gray-900">
      <section className="flex flex-col gap-6">
        <h3 className="text-[18px] font-bold">상품 등록</h3>
        <div className={boxClass}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <Field label="상품명">
              <input
                placeholder="상품명 입력..."
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="수량">
              <input
                placeholder="0"
                inputMode="numeric"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="가격">
              <input
                placeholder="0"
                inputMode="numeric"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="카테고리">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                <option value="">카테고리 선택</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>

            <div className="mt-5 flex items-center justify-between gap-4">
            <p className="whitespace-nowrap text-xs text-gray-500">
              * 추가 기능을 카테고리로 설정한 경우에만 카테고리를 이용해주세요.
            </p>
            <button onClick={handleRegister} className={`${buttonClass} bg-blue-500`}>
              등록
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h3 className="text-[18px] font-bold">재고 추가</h3>
        <div className={boxClass}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <Field label="상품명">
              <input
                placeholder="상품명 입력..."
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="수량">
              <input
                placeholder="0"
                inputMode="numeric"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-5 flex justify-end">
            <button onClick={handleAddStock} className={`${buttonClass} bg-blue-500`}>
              추가
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h3 className="text-[18px] font-bold">상품 삭제</h3>
        <div className={boxClass}>
          <div className="grid grid-cols-2 gap-x-8">
            <Field label="상품명">
              <input
                placeholder="상품명 입력..."
                value={deleteName}
                onChange={(e) => setDeleteName(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-5 flex justify-end">
            <button onClick={handleDelete} className={`${buttonClass} bg-red-600`}>
              삭제
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminPage;