import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import SalesReport from './pages/SalesReport';
import Suppliers from './pages/Suppliers';
import './index.css';

function App() {
  const [isSidebarActive, setSidebarActive] = useState(true); // Default to true for visibility on all screens

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  };

  return (
    <Router>
      <div>
        <Button className="toggle-btn" variant="dark" onClick={toggleSidebar}>
          <FaBars />
        </Button>
        <Sidebar isSidebarActive={isSidebarActive} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${isSidebarActive ? '' : 'collapsed'}`}>
          <Container fluid>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/sales-report" element={<SalesReport />} />
              <Route path="/suppliers" element={<Suppliers />} />
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;