import './App.css'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Content from './components/Content'
import CategoryPage from './pages/CategoryPage'
import Footer from './components/Footer'
import PricePage from './pages/PricePage'
import SortPage from './pages/SortPage'

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/sort" element={<SortPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App