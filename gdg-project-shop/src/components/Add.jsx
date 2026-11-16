import { useState } from 'react';

function Add() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState("");
    return (
        <div className="add-view">
            <h4 className="p-2 w-full max-w-140">상품 등록</h4>
            <div className="card">
                <div className="details">
                    <label>
                        <h6>상품명</h6>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="상품명 입력..."></input>
                    </label>
                    <label>
                        <h6>수량</h6>
                        <input type="number" min={1} value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="수량 입력..."></input>
                    </label>
                    <label>
                        <h6>가격</h6>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="가격 입력..."></input>
                    </label>
                    <label>
                        <h6>카테고리</h6>
                        <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="카테고리 선택..."></input>
                    </label>
                </div>
                <button onClick={() => console.log("상품 등록: ", { itemName: name, price: price, quantity: quantity, category: category })}>등록</button>
            </div>
        </div>
    )
}

export default Add;