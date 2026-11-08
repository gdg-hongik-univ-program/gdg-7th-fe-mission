import ProductItem from './ProductItem.jsx';

function ProductList({ items, cart, addToCart }) {
  return (
    <div className="product-list">
      {items.map((item) => (
        <ProductItem
          key={item.id}
          item={item}
          cart={cart}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;