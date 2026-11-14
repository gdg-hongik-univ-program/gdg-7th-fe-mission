import './App.css'
import { Routes, Route, useLocation } from 'react-router'
import Navbar from './components/Navbar'
import Content from './components/Content'
import CategoryPage from './pages/CategoryPage'
import Footer from './components/Footer'
import PricePage from './pages/PricePage'
import SortPage from './pages/SortPage'
import ManagementPage from './pages/ManagementPage'

function App() {
  const { pathname } = useLocation();
  const isManagement = pathname === '/management';

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/sort" element={<SortPage />} />
        <Route path="/management" element={<ManagementPage />} />
      </Routes>

      {!isManagement && <Footer />}
    </div>
  )
}

export default App