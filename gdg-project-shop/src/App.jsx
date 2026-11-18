import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import SortPage from './pages/SortPage';
import PricePage from './pages/PricePage'; 
import { getProducts } from './apis/products';
import AdminPage from './pages/AdminPage';


function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setItems(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);


  const showPage = (page) => {
    if (isLoading) {
      return <p className="text-center mt-10">Loading...</p>;
    }
    if (isError) {
      return (
        <p className="text-center mt-10 text-red-500">상품을 불러오지 못했어요. 잠시 후 다시 시도해주세요.</p>
      );
    }
    return page;
  };


  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={showPage(<Content items={items} cart={cart} setCart={setCart} />)} />
        <Route path="/category" element={showPage(<CategoryPage items={items} cart={cart} setCart={setCart} />)} />
        <Route path="/price" element={showPage(<PricePage items={items} cart={cart} setCart={setCart} />)} />
        <Route path="/sort" element={showPage(<SortPage items={items} cart={cart} setCart={setCart} />)} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
      <Footer cart={cart} />
    </div>
  );
}
export default App;