import { useState } from 'react';
import { admin_delete } from '../apis/products';

function Delete() {
    const [name, setName] = useState("");
    const body = { itemName: name };

    const handleClick = async () => {
        console.log("상품 삭제: ", body);
        await admin_delete(body);
    }
    return (
        <div className="delete-view">
            <h4 className="p-2 w-full max-w-140">상품 삭제</h4>
            <div className="card">
                <div className="details">
                    <label>
                        <h6>상품명</h6>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="상품명 입력..."></input>
                    </label>
                </div>
                <button onClick={handleClick} className="bg-red-600">삭제</button>
            </div>
        </div>
    )
}

export default Delete;