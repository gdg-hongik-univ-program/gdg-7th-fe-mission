export default function Footer({ onPurchase }) {
  return (
    <footer className="footerBox">
      <button className="footerButton" onClick={onPurchase}>
        장바구니 구매하기
      </button>
    </footer>
  );
}
