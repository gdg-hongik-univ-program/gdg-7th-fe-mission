import Card from '../components/Card';
import { useState } from 'react';
// import { itemData } from '../data/mockData.js';

function Category({ itemData, ...props }) {
    const [category, setCategory] = useState("전체");

    const categories = [
        {name: "전체", value: itemData},
        {name: "의류", value: itemData.filter(i => i.category=="의류")}, 
        {name: "전자기기", value: itemData.filter(i => i.category=="전자기기")},
        {name: "화장품", value: itemData.filter(i => i.category=="화장품")},
        {name: "식품", value: itemData.filter(i => i.category=="식품")}
    ];

    const options = categories.map(i => (
        <option key={i.name} value={i.name}>{i.name}</option>
    ));

    const items = data => data.map(i => (
        <Card addCart={props.addCart} cart={props.cart} key={i.id} name={i.itemName} price={i.price} quant={i.quantity} />
    ));

    return (
        <div>
            <select value={category} onChange={e => setCategory(e.target.value)} className="m-4 border">
                {options}
            </select>
            <div className="category flex flex-col gap-8 items-center">{items(categories.find(n => n.name==category)?.value)}</div>
        </div>
    )
}

export default Category;