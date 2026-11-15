import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import PricePage from './pages/PricePage'
import SortPage from './pages/SortPage'
import { getProducts } from './apis/products'
import './App.css'
import AdminPage from './pages/AdminPage'

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (id, count) => {
    setCart([...cart, { id, count }]);
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <main className="content">
          <p>Loading...</p>
        </main>
      ) : error ? (
        <main className="content">
          <p>{error}</p>
        </main>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage products={products} cart={cart} onAddToCart={addToCart} />} />
          <Route path="/category" element={<CategoryPage products={products} cart={cart} onAddToCart={addToCart} />} />
          <Route path="/price" element={<PricePage />} />
          <Route path="/sort" element={<SortPage products={products} cart={cart} onAddToCart={addToCart} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      )}
      <Footer />
    </>
  )
}

export default App