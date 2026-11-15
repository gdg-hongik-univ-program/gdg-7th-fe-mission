import { getProducts } from './apis/products.js';
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Content from './components/Content.jsx';
import Footer from './components/Footer.jsx';

import Price from './pages/Price.jsx';
import Sort from './pages/Sort.jsx';
import Category from './pages/Category.jsx';
import NotFound from './pages/NotFound.jsx';
import Admin from './pages/Admin.jsx'

function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProducts();
        setItems(data);
      } catch (err) {
        setError(err.message || '상품 데이터를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (id, count) => {
    const selectedItem = items.find((item) => item.id === id);

    // 재고가 없거나 구매 수량이 잘못된 경우
    if (
      !selectedItem ||
      count < 1 ||
      count > selectedItem.quantity ||
      cart.some((item) => item.id === id)
    ) {
      return;
    }

    // 재고 차감
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - count }
          : item
      )
    );

    // 장바구니에 상품 추가
    setCart((prevCart) => [
      ...prevCart,
      { id, count }
    ]);
  };

  return (
    <BrowserRouter>
      <Navbar />

      {isLoading ? (
        <main className="content">
          <p>Loading... 상품 데이터를 불러오는 중입니다.</p>
        </main>
      ) : error ? (
        <main className="content">
          <p className="error-message">Error: {error}</p>
        </main>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Content
                items={items}
                cart={cart}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/price"
            element={
              <Price
                items={items}
                cart={cart}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/sort"
            element={
              <Sort
                items={items}
                cart={cart}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/category"
            element={
              <Category
                items={items}
                cart={cart}
                addToCart={addToCart}
              />
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}

      <Footer cart={cart} items={items} />
    </BrowserRouter>
  );
}

export default App;