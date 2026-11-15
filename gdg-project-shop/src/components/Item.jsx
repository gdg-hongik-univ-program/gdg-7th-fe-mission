import { useState } from 'react';
 
function Item({ item, cart, setCart }) {
  const [count, setCount] = useState('');
  const isInCart = cart.some((cartItem) => cartItem.id === item.id);
 
  const handleChange = (e) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');

    if (onlyNumber === '') {
      setCount('');
      return;
    }
    let num = Number(onlyNumber);
    if (num < 1) num = 1;
    if (num > item.quantity) num = item.quantity;
    setCount(num);
  };
 
  const handleAddCart = () => {
    setCart([...cart, { id: item.id, count: count }]);
  };
 
  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-lg p-5 mb-4">
      <div>
        <p className="font-bold text-lg">{item.itemName}</p>
        <p className="mt-2">
          {item.price}원
          <span className="text-gray-400 text-sm ml-2">남은 수량: {item.quantity}개</span>
        </p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          inputMode="numeric"
          placeholder="개수 입력..."
          value={count}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-40"
        />
        <button
          onClick={handleAddCart}
          disabled={isInCart}
          className={
            isInCart
              ? 'bg-gray-400 text-white rounded-lg px-6 py-2'
              : 'bg-blue-500 text-white rounded-lg px-6 py-2'
          }
        >
          장바구니
        </button>
      </div>
    </div>
  );
}
 
export default Item;