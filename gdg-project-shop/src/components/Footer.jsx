import { useState } from "react";
import { useCartStore } from "../context/useCartStore";
import { purchaseProducts } from "../apis/products";

function Footer() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const [purchaseResult, setPurchaseResult] = useState(null);
  const [error, setError] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (cart.length === 0) {
      setError("장바구니가 비어 있습니다.");
      return;
    }

    setIsPurchasing(true);
    setError("");
    setPurchaseResult(null);

    try {
      const result = await purchaseProducts(cart);

      setPurchaseResult(result);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <footer className="footer">
      <button
        className="purchase-button"
        onClick={handlePurchase}
        disabled={isPurchasing}
      >
        {isPurchasing ? "구매 처리 중..." : "장바구니 구매하기"}
      </button>

      {error && <p>{error}</p>}

      {purchaseResult && (
        <div className="purchase-result">
          <h3>구매 완료</h3>

          {purchaseResult.items.map((item, index) => (
            <p key={index}>
              {item.itemName} × {item.count}개 :
              {item.price.toLocaleString()}원
            </p>
          ))}

          <strong>
            총 구매 금액: {purchaseResult.totalPrice.toLocaleString()}원
          </strong>
        </div>
      )}
    </footer>
  );
}

export default Footer;