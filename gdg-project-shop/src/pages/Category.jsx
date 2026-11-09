import Card from '../components/Card';
import { itemData } from '../data/mockData.js';

function Category() {
    const items = itemData.map(i => (
        <Card name={i.itemName} price={i.price} quant={i.quantity} />
    ));
    return (
        <div className="category flex flex-col gap-8 items-center">{items}</div>
    )
}

export default Category;