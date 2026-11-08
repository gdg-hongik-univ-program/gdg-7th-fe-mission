import { itemData } from '../data/mockData.js';

function Footer({ cart }) {

  const handlePurchase = () => {
    if (cart.length === 0) {
      console.log("장바구니가 비어 있습니다.");
      return;
    }

    console.log("===== 구매 목록 =====");

    cart.forEach((cartItem) => {
      const product = itemData.find(
        (item) => item.id === cartItem.id
      );

      if (product) {
        console.log(
          `상품명: ${product.itemName} / 구매 수량: ${cartItem.count}개 / 가격: ${product.price * cartItem.count}원`
        );
      }
    });

    console.log("====================");
  };

  return (
    <footer>
      <button
        className="btn1 purchase"
        onClick={handlePurchase}
      >
        장바구니 구매하기
      </button>
    </footer>
  );
}

export default Footer;