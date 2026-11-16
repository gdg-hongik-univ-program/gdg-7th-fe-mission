function Footer({ onPurchase }) {
  return (
    <footer className="footer">
      <button className="footer-button" onClick={onPurchase}>
        장바구니 구매하기
      </button>
    </footer>
  );
}

export default Footer;