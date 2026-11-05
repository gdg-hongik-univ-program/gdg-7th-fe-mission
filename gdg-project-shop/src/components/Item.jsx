import { useState } from "react";
import { useCart } from "../context/CartContext";

function Item({ item }) {
  const [count, setCount] = useState("");
  const { addToCart, isInCart } = useCart();

  const added = isInCart(item.id); // 이미 장바구니에 담겼는지

  const handleAddToCart = () => {
    const num = Number(count);

    if (!num || num <= 0) {
      alert("개수를 올바르게 입력해주세요.");
      return;
    }
    if (num > item.quantity) {
      alert(`남은 수량(${item.quantity}개)보다 많이 담을 수 없어요.`);
      return;
    }

    addToCart(item.id, num); // { id, count } 형태로 저장됨
  };

  return (
    <div className="item-card">
      {/* 왼쪽: 상품 정보 */}
      <div className="item-info">
        <h3 className="item-name">{item.itemName}</h3>
        <p className="item-detail">
          <span className="item-price">{item.price} 원</span>
          <span className="item-stock">남은 수량: {item.quantity}개</span>
        </p>
      </div>

      {/* 오른쪽: 개수 입력 + 장바구니 버튼 */}
      <div className="item-actions">
        <input
          type="number"
          min="1"
          placeholder="개수 입력..."
          value={count}
          onChange={(e) => setCount(e.target.value)}
          disabled={added}
        />
        <button onClick={handleAddToCart} disabled={added}>
            장바구니
        </button>
      </div>
    </div>
  );
}

export default Item;