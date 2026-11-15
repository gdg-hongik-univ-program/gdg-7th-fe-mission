import Item from "../components/Item";

function HomePage({ products, cart, onAddToCart }) {
  return (
    <main className="content">
      <div className="w-[480px] max-w-[90%] flex flex-col gap-6">
        {products.map((item) => (
          <Item
            key={item.id}
            item={item}
            isInCart={cart.some((c) => c.id === item.id)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </main>
  );
}

export default HomePage;