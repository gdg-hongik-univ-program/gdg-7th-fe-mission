import Card from '../components/Card';
import { useState } from 'react';
// import { itemData } from '../data/mockData.js';

function Category({ itemData, ...props }) {
    const [category, setCategory] = useState("전체");

    const options = itemData.map(i => (
        <option key={i.itemName} value={i.category}>{i.category}</option>
    ));

    const items = data => data.map(i => (
        <Card addCart={props.addCart} cart={props.cart} key={i.id} id={i.id} name={i.itemName} price={i.price} quant={i.quantity} />
    ));

    return (
        <div>
            <select value={category} onChange={e => setCategory(e.target.value)} className="m-4 border">
                {options}
            </select>
            <div className="category flex flex-col gap-8 items-center">{items((category=="전체") ? itemData : itemData.filter(i => i.category==category))}</div>
        </div>
    )
}

export default Category;