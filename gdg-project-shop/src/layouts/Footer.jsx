import { purchaseProducts } from "../apis/products";
import { useCart } from "../hooks/useCart.js";

function Footer({ refresh, item }) {
  const { cart, clearCart } = useCart();

  // 렌더링될 때마다 cart + item으로 계산 → cart가 바뀌면 자동으로 다시 계산됨
  const total = cart.reduce((sum, c) => {
    const product = item.find((p) => p.id === c.id);
    return product ? sum + product.price * Number(c.count) : sum;
  }, 0);

  async function handlePurchase() {
    if (cart.length === 0) {
      alert("장바구니가 비어 있습니다");
      return;
    }

    try {
      await purchaseProducts(cart);
      await refresh(); // 재고 갱신
      clearCart(); // 장바구니 비우기
      alert(`${total}원 결제 완료`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <footer>
      <button onClick={handlePurchase} className="purchase">
        장바구니 구매하기
      </button>
    </footer>
  );
}

export default Footer;
