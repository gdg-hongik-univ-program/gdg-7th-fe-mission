import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';
import SortPage from './components/SortPage';
import PricePage from './components/PricePage'; 
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


let pageContent;
  if (isLoading) {
    pageContent = <p className="text-center mt-10">Loading...</p>;
  } else if (isError) {
    pageContent = (
      <p className="text-center mt-10 text-red-500">상품을 불러오지 못했어요. 잠시 후 다시 시도해주세요.</p>
    );
  } else {
    pageContent = (
      <Routes>
        <Route path="/" element={<Content items={items} cart={cart} setCart={setCart} />} />
        <Route path="/category" element={<CategoryPage items={items} cart={cart} setCart={setCart} />} />
        <Route path="/price" element={<PricePage items={items} cart={cart} setCart={setCart} />} />
        <Route path="/sort" element={<SortPage items={items} cart={cart} setCart={setCart} />} />
        <Route path="*" element={<p>404</p>} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    );
  }


  return (
    <div className="app">
      <Navbar />
      {pageContent}
      <Footer />
    </div>
  );
}
export default App;