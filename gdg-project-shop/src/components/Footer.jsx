import { useLocation } from "react-router";
import { buy } from "../apis/products";

function Footer(props) {
    const buy = async () => {
        console.log(props.cart);
        const body = props.cart;
        await buy(body);
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