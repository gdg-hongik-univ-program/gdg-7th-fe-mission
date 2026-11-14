import { useState } from "react";

function Item({ id, itemName, price, quantity, cart, onAddToCart }) {
  const [count, setCount] = useState("");

  const isInCart = cart.some((cartItem) => cartItem.id === id);

  function handleCountChange(event) {
    const value = event.target.value;

    if (value === "") {
      setCount("");
      return;
    }

    if (!/^\d+$/.test(value)) return;

    const number = Number(value);
    if (number < 1 || number > quantity) return;

    setCount(value);
  }

  function handleAddToCart() {
    if (count === "") {
      alert("구매 수량을 입력해 주세요.");
      return;
    }

    onAddToCart({ id, count: Number(count) });
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-300 px-5 py-4">
      <div>
        <p className="font-bold">{itemName}</p>
        <p className="mt-3">
          <span>{price} 원</span>
          <span className="ml-3 text-xs text-gray-500">
            남은 수량: {quantity}개
          </span>
        </p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          inputMode="numeric"
          placeholder="개수 입력..."
          value={count}
          onChange={handleCountChange}
          className="w-36 rounded-md border border-gray-300 px-3 py-2"
        />
        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          className="rounded-md bg-blue-500 px-6 py-2 text-white disabled:bg-gray-400"
        >
          장바구니
        </button>
      </div>
    </div>
  );
}

export default Item;