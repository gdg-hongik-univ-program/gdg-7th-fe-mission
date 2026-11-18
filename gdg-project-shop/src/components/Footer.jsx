import { purchaseProducts } from '../apis/products';
import { useLocation } from 'react-router-dom';

function Footer({ cart }) {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  const handlePurchase = async () => {
    if (cart.length === 0) {
      alert('장바구니가 비어 있어요');
      return;
    }
    try {
      const result = await purchaseProducts(cart);
      console.log('구매 완료', result);
      alert(`구매 완료! 총 ${result.totalPrice}원`);
    } catch (error) {
      console.error('구매에 실패했어요', error);
      alert('구매에 실패했어요');
    }
  };
  
    if (isAdminPage) {
      return null;
    }

  return (
    <footer className="footer">
      <button className="cart-button" onClick={handlePurchase}>장바구니 구매하기</button>
    </footer>
  );
}

export default Footer;