import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';
import SortPage from './components/SortPage';
import PricePage from './components/PricePage'; 

function App() {
  const [cart, setCart] = useState([]);
 
  return (
    <div className="app">
      <Navbar />
 
      <Routes>
        <Route path="/" element={<Content cart={cart} setCart={setCart} />} />
        <Route path="/category" element={<CategoryPage cart={cart} setCart={setCart} />} />
        <Route path="/sort" element={<SortPage cart={cart} setCart={setCart} />} />
        <Route path="/price" element={<PricePage cart={cart} setCart={setCart} />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
 
      <Footer />
    </div>
  );
}
export default App;