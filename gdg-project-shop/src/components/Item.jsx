import { useState } from "react";

function Item({ item, addToCart, cart }) {
  const [count, setCount] = useState("");
  const isCart = cart.find((c) => c.id === item.id);
  const left = item.quantity - (isCart ? Number(isCart.count) : 0);

  return (
    <>
      <div className="flex items-center justify-between gap-5 rounded-2xl border border-gray-400 p-5 w-[500px] h-[100px]">
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-left">{item.itemName}</h3>

          <div className="flex items-center gap-3">
            <p className="text-sm">{item.price} 원</p>
            <p className="text-gray-400 text-xs">남은 수량: {left}개</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            placeholder="개수 입력..."
            onChange={(e) => setCount(e.target.value)}
            className=" bg-white border w-[100px] font-gray rounded-2xl placeholder:text-xs pl-1"
          />
          <button
            disabled={isCart}
            onClick={() => addToCart(item.id, count)}
            className="bg-blue-500 rounded-2xl text-white cursor-pointer p-1 text-xs disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            장바구니
          </button>
        </div>
      </div>
    </>
  );
}

export default Item;
