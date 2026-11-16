import { useState, useEffect } from 'react';

function Card({ cart, addCart, id, name, price, quant }) {
    const [count, setCount] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (cart.find(item => item.id == id)) {
            console.log(cart.find(item => item.id == id))
            setIsDisabled(true);
        }
        return () => setIsDisabled(false);
    }, []);

    const change = e => {
        if (e.target.value <= 0) {
            setCount('');
        } else {
            setCount((e.target.value<=quant) ? e.target.value : quant);
        }
    }
    const handleClick = () => {
        if (count) {
            addCart({id: id, count: count});
            setIsDisabled(true);
        }
    }
    return (
        <div className="card">
            <div className="details flex flex-col items-start gap-2">
                <h6>{name}</h6>
                <div className="flex gap-4">
                    <p>{price}원</p> <caption className="opacity-50">남은 수량 {quant}개</caption>
                </div>
            </div>
            <label className="cart flex gap-2 min-h-10">
                <input type="number" value={count} onChange={change} min={1} max={quant} className="p-2" placeholder="개수 입력..."></input>
                <button onClick={handleClick} className="cart-button disabled:bg-gray-500" disabled={isDisabled}>장바구니</button>
            </label>
        </div>
    );
}

export default Card;