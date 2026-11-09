import Card from '../components/Card';
import { useState } from 'react';
import { itemData } from '../data/mockData.js';

function Category(props) {
    const [category, setCategory] = useState("전체");

    const clothings = itemData.filter(i => i.id<=3);
    const digitals = itemData.filter(i => (i.id>=4 && i.id<=6));
    const cosmetics = itemData.filter(i => (i.id>=7 && i.id<=9));
    const foods = itemData.filter(i => (i.id>=10 && i.id<=12));

    const cats = [
        {name: "전체", value: itemData},
        {name: "의류", value: clothings}, 
        {name: "전자기기", value: digitals}, 
        {name: "화장품", value: cosmetics},
        {name: "음식", value: foods}
    ];

    const options = cats.map(i => (
        <option value={i.name}>{i.name}</option>
    ));

    const items = data => data.map(i => (
        <Card addCart={props.addCart} cart={props.cart} id={i.id} name={i.itemName} price={i.price} quant={i.quantity} />
    ));

    return (
        <div>
            <select value={category} onChange={e => setCategory(e.target.value)} className="m-4 border">
                {options}
            </select>
            <div className="category flex flex-col gap-8 items-center">{items(cats[cats.findIndex(cate => cate.name == category)].value)}</div>
        </div>
    )
}

export default Category;