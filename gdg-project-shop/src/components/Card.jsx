function Card(props) {
    return (
        <div className="card flex flex-row text-black border border-gray-300 rounded-lg p-4 gap-4 items-center basis-24 w-full max-w-120 justify-between">
            <div className="details flex flex-col items-start">
                <h6>{props.name}</h6>
                <div className="flex gap-4">
                    <p>{props.price}원</p> <caption className="opacity-50">남은 수량 {props.quant}개</caption>
                </div>
            </div>
            <div className="quant flex gap-2 max-w-48 h-8">
                <input type="text" className="max-w-24" placeholder="개수 입력..."></input>
                <button className="cart text-white bg-blue-800 px-2 rounded-sm">장바구니</button>
            </div>
        </div>
    );
}

export default Card;