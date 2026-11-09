import { useState } from 'react';

function Card(props) {
    const [count, setCount] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const change = e => {
        if (e.target.value == 0) {
            setCount('');
            setIsDisabled(true);
        } else {
            setCount((e.target.value<=props.quant) ? e.target.value : props.quant);
        }
    }
    const handleClick = () => {
        if (count) {
            props.addCart({id: props.id, count: count});
            setIsDisabled(true);
        }
    }
    return (
        <div className="card flex flex-row text-black border border-gray-300 rounded-lg p-8 gap-4 items-center basis-28 w-full max-w-140 justify-between">
            <div className="details flex flex-col items-start gap-2">
                <h6>{props.name}</h6>
                <div className="flex gap-4">
                    <p>{props.price}원</p> <caption className="opacity-50">남은 수량 {props.quant}개</caption>
                </div>
            </div>
            <label className="cart flex gap-2 min-h-10">
                <input type="number" value={count} onChange={change} min={1} max={props.quant} className="max-w-36 rounded-md p-2" placeholder="개수 입력..."></input>
                <button onClick={handleClick} className="cart-button text-white bg-blue-700 px-4 rounded-md disabled:bg-gray-500" disabled={isDisabled}>장바구니</button>
            </label>
        </div>
    );
}

export default Card;