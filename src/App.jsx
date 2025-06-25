import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import AlertComponent from './components/AlertComponent';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import SalesReport from './pages/SalesReport';
import Suppliers from './pages/Suppliers';
import './index.css';

function App() {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [alerts, setAlerts] = useState([]); // Array to manage multiple alerts

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  };

  const showSidebar = () => {
    setSidebarActive(true);
  };

  const hideSidebar = () => {
    setSidebarActive(false);
  };

  const addAlert = (message, variant = 'success', duration = 5000) => {
    const id = Date.now();
    setAlerts([...alerts, { id, message, variant }]);
    if (duration) {
      setTimeout(() => removeAlert(id), duration);
    }
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <Router>
      <div>
        <Button className="toggle-btn" variant="dark" onClick={toggleSidebar}>
          <FaBars />
        </Button>
        <div className="hover-trigger" onMouseEnter={showSidebar}></div>
        <Sidebar
          isSidebarActive={isSidebarActive}
          toggleSidebar={toggleSidebar}
          hideSidebar={hideSidebar}
        />
        <div className={`main-content ${isSidebarActive ? '' : 'collapsed'}`}>
          <Container fluid>
            <div className="alert-container">
              {alerts.map((alert) => (
                <AlertComponent
                  key={alert.id}
                  message={alert.message}
                  variant={alert.variant}
                  onClose={() => removeAlert(alert.id)}
                />
              ))}
            </div>
            <Routes>
              <Route path="/" element={<Dashboard addAlert={addAlert} />} />
              <Route path="/products" element={<Products addAlert={addAlert} />} />
              <Route path="/sales-report" element={<SalesReport addAlert={addAlert} />} />
              <Route path="/suppliers" element={<Suppliers addAlert={addAlert} />} />
            </Routes>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;