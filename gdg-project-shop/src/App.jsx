import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import PricePage from './pages/PricePage'
import SortPage from './pages/SortPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (id, count) => {
    setCart([...cart, { id, count }]);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/category" element={<CategoryPage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/sort" element={<SortPage cart={cart} onAddToCart={addToCart} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App