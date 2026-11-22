import { useLocation } from 'react-router';
import { purchase } from '../apis/products';
import { useShopContext } from '../context/ShopContext';

function Footer() {
  const { cart, updateData } = useShopContext();
  const buy = async () => {
    console.log([...cart]);
    await purchase([...cart]);
    updateData('purchase');
  };
  const location = useLocation();
  return (
    <>
      {location.pathname != '/admin' && (
        <footer className="flex justify-center">
          <button onClick={buy} className="buy">
            장바구니 구매하기
          </button>
        </footer>
      )}
    </>
  );
}

export default Footer;
