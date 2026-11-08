import { useState } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Content from './components/Content.jsx'
import Footer from './components/Footer.jsx'

import Price from './pages/price.jsx'
import Sort from './pages/Sort.jsx'
import Category from './pages/Category.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (id, count) => {
    setCart((prevCart) => {
      if (prevCart.some((item) => item.id === id)) {
        return prevCart;
      }

      return [...prevCart, { id, count }];
    });
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Content
              key={location.pathname}
              cart={cart}
              addToCart={addToCart}
            />
          }
        />

        <Route path="/price" element={
          <Price cart={cart} addToCart={addToCart} />
        } />

        <Route path="/sort" element={
          <Sort cart={cart} addToCart={addToCart} />
        } />

        <Route path="/category" element={
          <Category cart={cart} addToCart={addToCart} />
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer cart={cart} />
    </BrowserRouter>
  )
}

export default App