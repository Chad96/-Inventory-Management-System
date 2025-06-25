import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaChartLine, FaUsers } from 'react-icons/fa';

function Sidebar({ isSidebarActive, toggleSidebar }) {
  return (
    <div className={`sidebar ${isSidebarActive ? 'active' : 'collapsed'}`}>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link as={Link} to="/" onClick={toggleSidebar} className="nav-link">
            <FaTachometerAlt className="me-2" /> Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/products" onClick={toggleSidebar} className="nav-link">
            <FaBox className="me-2" /> Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/sales-report" onClick={toggleSidebar} className="nav-link">
            <FaChartLine className="me-2" /> Sales Report
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/suppliers" onClick={toggleSidebar} className="nav-link">
            <FaUsers className="me-2" /> Suppliers
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;