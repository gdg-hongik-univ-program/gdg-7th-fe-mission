import Card from '../components/Card';
import { useState, useEffect } from 'react';
// import { itemData } from '../data/mockData.js';
import { products } from '../../src/apis/products.js';

function Category(props) {
    const [category, setCategory] = useState("전체");
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await products();
                setItemData(data);
            } catch (error) {
                console.error("상품 데이터를 불러오는 데 실패했습니다:", error);
            }
        };

        fetchProducts();
    }, []);

    const categories = [
        {name: "전체", value: itemData},
        {name: "의류", value: itemData.filter(i => i.category=="의류")}, 
        {name: "전자기기", value: itemData.filter(i => i.category=="전자기기")},
        {name: "화장품",  value: itemData.filter(i => i.category=="화장품")},
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