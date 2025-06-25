import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ addAlert }) {
  const [lowStock, setLowStock] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsRes = await axios.get('http://localhost:3001/products');
      setProductsCount(productsRes.data.length);
      const lowStockItems = productsRes.data.filter(p => p.stock <= p.lowStockThreshold);
      setLowStock(lowStockItems);
      if (lowStockItems.length > 0) {
        lowStockItems.forEach(item => {
          addAlert(`${item.name}: ${item.stock} units remaining`, 'warning');
        });
      }
      const salesRes = await axios.get('http://localhost:3001/sales');
      setSalesCount(salesRes.data.length);
    } catch (err) {
      addAlert('Failed to load data. Please check the server.', 'danger');
    }
  };

  return (
    <div>
      {/* <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Inventory Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/sales-report">Sales Report</Nav.Link>
              <Nav.Link as={Link} to="/suppliers">Suppliers</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <h1>Dashboard</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>{productsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <Card.Text>{salesCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;