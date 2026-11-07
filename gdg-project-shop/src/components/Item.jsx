import { useState } from "react";

function Item({ item, isInCart, onAddToCart }) {
  const [count, setCount] = useState("");

  const handleChange = (e) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");

    if (onlyNumber === "") {
      setCount("");
      return;
    }

    let num = Number(onlyNumber);
    if (num < 1) num = 1;
    if (num > item.quantity) num = item.quantity;
    setCount(num);
  };

  const handleClick = () => {
    if (count === "") return;
    onAddToCart(item.id, count);
  };

  return (
    <article className="flex items-center justify-between border border-gray-300 rounded-md px-5 py-4">
      <div>
        <h3 className="font-bold mb-3">{item.itemName}</h3>
        <p className="text-sm">
          {item.price} 원
          <span className="ml-3 text-xs text-gray-400">남은 수량: {item.quantity}개</span>
        </p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={count}
          onChange={handleChange}
          placeholder="개수 입력..."
          className="w-36 border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <button
          onClick={handleClick}
          disabled={isInCart}
          className={`w-28 rounded-md py-2 text-sm text-white ${isInCart ? "bg-gray-400" : "bg-blue-500"}`}
        >
          장바구니
        </button>
      </div>
    </article>
  );
}

export default Item;