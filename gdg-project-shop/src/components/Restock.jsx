import { useState } from 'react';
import { admin_products_stock } from '../apis/products';

function Restock({ update }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const handleClick = async () => {
        const body = {
            itemName: name, 
            quantity: quantity
        }
        await admin_products_stock(body);
        update("restock");
    }
    return (
        <div className="restock-view">
            <h4 className="p-2 w-full max-w-140">재고 추가</h4>
            <div className="card">
                <div className="details">
                    <label>
                        <h6>상품명</h6>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="상품명 입력..."></input>
                    </label>
                    <label>
                        <h6>수량</h6>
                        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="수량 입력..."></input>
                    </label>
                </div>
                <button onClick={handleClick}>추가</button>
            </div>
        </div>
    )
}

export default Restock;