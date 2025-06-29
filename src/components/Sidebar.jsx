import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaChartLine, FaUsers, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import './Sidebar.css';

function Sidebar({ isSidebarActive, toggleSidebar, hideSidebar }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div
      className={`sidebar ${isSidebarActive ? 'active' : 'collapsed'}`}
      onMouseLeave={hideSidebar}
    >
      <div className="sidebar-header">Inventory Management</div>

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

        {user && (
          <>
            <Nav.Item>
              <Nav.Link as={Link} to="/profile" onClick={toggleSidebar} className="nav-link">
                <FaUserCircle className="me-2" /> Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleLogout} className="nav-link">
                <FaSignOutAlt className="me-2" /> Logout
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </div>
  );
}

export default Sidebar;
