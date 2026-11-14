function Footer()
{
    return(
        <footer className="footer">
            <button className="bucket" onClick={() => console.log("장바구니 구매하기 클릭")}>
            장바구니 구매하기</button>
        </footer>        
    );
}

export default Footer;