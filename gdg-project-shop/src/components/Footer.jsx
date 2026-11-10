function Footer(props) {
    const buy = () => {
        console.log(props.cart);
    }
    return (
        <footer className="flex justify-center">
            <button onClick={buy} className="buy">장바구니 구매하기</button>
        </footer>
    )
}

export default Footer;