import { useState } from 'react';

export default function Item({ id, itemName, price, quantity, cart, onAddToCart }) {
  const [count, setCount] = useState("");
  const isInCart = cart.some((c) => c.id === id);  

  // 입력할 때: 숫자만, 재고 이하로
  function handleChange(e) {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    if (value !== "" && Number(value) > quantity) {
      setCount(String(quantity));
      return;
    }

    setCount(value);
  }

  // 장바구니 버튼: 1 이상인지 확인하고 부모에게 알림
  function handleAdd() {
    const num = Number(count);

    if (num < 1) {
      alert("1개 이상 입력해 주세요.");
      return;
    }

    onAddToCart(id, num);
  }

  return (
    <article className="flex items-center justify-between gap-4 rounded-lg border border-gray-400 bg-white px-5 py-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-bold text-black">{itemName}</h3>
        <div className="flex items-baseline gap-2 whitespace-nowrap">
          <p className="text-base text-black">{price} 원</p>
          <p className="text-xs text-gray-500">남은 수량: {quantity}개</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <input
          type="text"
          inputMode="numeric"
          placeholder="개수 입력..."
          value={count}
          onChange={handleChange}
          disabled={isInCart}
          className="h-10 w-40 rounded-md border border-gray-400 px-3 text-sm disabled:bg-gray-100"
        />
        <button
          onClick={handleAdd}
          disabled={isInCart}
          className="h-10 whitespace-nowrap rounded-md bg-blue-500 px-6 text-sm text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          장바구니
        </button>
      </div>
    </article>
  );
}