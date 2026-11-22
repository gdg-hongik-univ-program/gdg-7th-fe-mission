import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router';
import Category from './pages/Category';
import Sort from './pages/Sort';
import Admin from './pages/Admin';
import { products } from './apis/products.js';

function App() {
  const [cart, setCart] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState('pending');
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading('loading');
        const data = await products();
        setItemData(data);
        setLoading('fulfilled');
      } catch (error) {
        setLoading('rejected');
        console.error('상품 데이터를 불러오는 데 실패했습니다:', error);
      }
    })();
    console.log(update);
  }, [update]);

  const updateData = (type) => {
    if (type == 'purchase') setCart([]);
    setUpdate((n) => n + 1);
  };

  const addCart = (object) => {
    setCart([...cart, object]);
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        {loading == 'loading' && 'Loading...'}
        {loading == 'rejected' && 'Error!'}
        {loading == 'pending' && 'Wait...'}
        {loading == 'fulfilled' && (
          <Routes>
            <Route
              path="/"
              element={
                <Home cart={cart} addCart={addCart} itemData={itemData} />
              }
            />
            <Route
              path="/category"
              element={
                <Category cart={cart} addCart={addCart} itemData={itemData} />
              }
            />
            <Route
              path="/sort-items"
              element={
                <Sort cart={cart} addCart={addCart} itemData={itemData} />
              }
            />
            <Route path="/admin" element={<Admin update={updateData} />} />
          </Routes>
        )}
      </div>
      <Footer cart={cart} update={updateData} />
    </>
  );
}

export default App;
