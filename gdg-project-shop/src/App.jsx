import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import Content from './components/Content'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CategoryPage from './pages/CategoryPage'
import PricePage from './pages/PricePage'
import SortPage from './pages/SortPage'

function App() {
  const [cart, setCart] = useState([]);   // [{ id, count }, ...]

  function handleAddToCart(id, count) {
    setCart((prev) => {
      if (prev.some((item) => item.id === id)) return prev;
      return [...prev, { id, count }];
    });
  }

  console.log(cart);   // 확인용 (나중에 지우기)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/category" element={<CategoryPage cart={cart} onAddToCart={handleAddToCart} />} />
        <Route path="/price" element={<PricePage cart={cart} onAddToCart={handleAddToCart} />} />
        <Route path="/sort" element={<SortPage cart={cart} onAddToCart={handleAddToCart} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App