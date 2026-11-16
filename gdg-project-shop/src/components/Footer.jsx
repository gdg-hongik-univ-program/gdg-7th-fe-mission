import { useLocation } from "react-router";
import { purchase } from "../apis/products";

function Footer({ cart }) {
    const buy = async () => {
        console.log("장바구니 구매하기", cart);
        await purchase(cart);
    }
    const location = useLocation();
    return (
        <>
        {location.pathname!="/admin" && (
            <footer className="flex justify-center">
                <button onClick={buy} className="buy">장바구니 구매하기</button>
            </footer> 
        )}
        </>
    )
}

export default Footer;