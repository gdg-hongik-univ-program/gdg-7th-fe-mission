import { createProduct } from "../../apis/products.js";
import { useState } from "react";
import CategorySelect from "../CategorySelect.jsx";

function Register({ refresh }) {
  const [itemName, setItemname] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const [category, setCategory] = useState("카테고리 선택");

  async function handleRegister() {
    const data = {
      itemName,
      price: Number(price),
      quantity: Number(quantity),
      category,
    };

    try {
      const result = await createProduct(data);
      console.log(result);
      await refresh();
      alert("상품이 등록되었습니다.");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-5 w-150 pb-10">
      <p className="pt-3 font-bold text-lg">상품 등록</p>
      <div className="flex flex-col gap-4 border rounded-md p-5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <div className="flex items-center gap-4">
            <label className="w-16 shrink-0">상품명</label>
            <input
              value={itemName}
              onChange={(e) => setItemname(e.target.value)}
              placeholder="상품명 입력..."
              className="flex-1 min-w-0 border rounded-md px-2 h-8 placeholder:text-xs"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-16 shrink-0">수량</label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="flex-1 min-w-0 border rounded-md px-2 h-8"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="w-16 shrink-0">가격</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 min-w-0 border rounded-md px-2 h-8"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <CategorySelect
              category={category}
              onSelect={setCategory}
              width="w-40"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400">
            * 추가 기능을 카테고리로 설정한 경우에만 카테고리를 이용해주세요.
          </p>
          <button
            onClick={handleRegister}
            className="w-32 h-8 shrink-0 rounded-md bg-blue-500 text-white text-sm cursor-pointer"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
