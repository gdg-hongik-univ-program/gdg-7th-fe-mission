import { useEffect, useState } from "react";
import { getProducts } from "./apis/products.js";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import PricePage from "./pages/PricePage.jsx";
import SortPage from "./pages/SortPage.jsx";
import "./App.css";
import AdminPage from "./pages/AdminPage.jsx";

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("상품을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  function addToCart(newItem) {
    setCart([...cart, newItem]);
  }

  return (
    <>
      <Navbar />

    {isLoading && (
      <div className="p-10 text-center text-black">
        <p>Loading...</p>
        <p>잠시만 기다려 주세요</p>
      </div>
    )}

      {!isLoading && error && (
        <p className="p-10 text-center text-red-500">{error}</p>
      )}

      {!isLoading && !error && (
        <Routes>
          <Route path="/" element={<Content products={products} cart={cart} onAddToCart={addToCart} />} />
          <Route path="/category" element={<CategoryPage products={products} cart={cart} onAddToCart={addToCart} />} />
          <Route path="/price" element={<PricePage products={products} cart={cart} onAddToCart={addToCart} />} />
          <Route path="/sort" element={<SortPage products={products} cart={cart} onAddToCart={addToCart} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      )}

      <Footer />
    </>
  );
}

export default App;