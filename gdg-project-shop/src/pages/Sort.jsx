import Card from '../components/Card';
import { useState } from 'react';
import { itemData } from '../data/mockData.js';

function Sort(props) {
    const [sortBy, setSortBy] = useState("name");

    const sorted = (sortBy=="name") ? itemData.sort((a, b) => {
        if (a.itemName < b.itemName) return -1;
        if (a.itemName > b.itemName) return 1;
        return 0;
    }) : itemData.sort((a, b) => {
        return (a.price - b.price);
    });

    const items = data => data.map(i => (
        <Card addCart={props.addCart} cart={props.cart} key={i.id} name={i.itemName} price={i.price} quant={i.quantity} />
    ));

    return (
        <div>
            <div className="flex gap-2 m-4">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border">
                    <option value="name">상품명</option>
                    <option value="price">가격</option>
                </select>
                <p>순서로 정렬</p>
            </div>
            <div className="category flex flex-col gap-8 items-center">{items(sorted)}</div>
        </div>
    )
}

export default Sort;