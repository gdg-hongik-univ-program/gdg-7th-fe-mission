import { useState } from 'react';

function ProductItem({ item, cart, addToCart }) {
  const [count, setCount] = useState("1");

  const isAdded = cart.some(
    (cartItem) => cartItem.id === item.id
  );

  const handleChange = (event) => {
    const value = event.target.value;
    const numberOnly = value.replace(/[^0-9]/g, '');

    setCount(numberOnly);
  };

  const isOverStock = count !== "" && Number(count) > item.quantity;

  const handleCart = () => {
    const purchaseCount = Number(count);

    if (purchaseCount < 1 || isOverStock) return;

    addToCart(item.id, purchaseCount);
  };

  return (
    <div className="product-item">
      <div className="product-info">
        <h3>{item.itemName}</h3>

        <div className="product-detail">
          <span>{item.price} 원</span>

          <input
            type="text"
            inputMode="numeric"
            placeholder="개수 입력..."
            value={count}
            onChange={handleChange}
          />
        </div>

        <small>남은 수량: {item.quantity}개</small>
      </div>

      <button
        onClick={handleCart}
        disabled={
          isAdded ||
          count === "" ||
          Number(count) < 1 ||
          isOverStock
        }
      >
        장바구니
      </button>

      {isOverStock && (
        <p className="error-message">
          남은 수량은 {item.quantity}개입니다. 수량을 다시 입력해 주세요.
        </p>
      )}
    </div>
  );
}

export default ProductItem;