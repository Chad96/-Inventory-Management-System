import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import './Dashboard.css';
import AlertComponent from '../components/AlertComponent';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

import {
  FaBoxOpen,
  FaChartLine,
  FaExclamationTriangle,
  FaBell,
} from 'react-icons/fa';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

function Dashboard() {
  const [lowStock, setLowStock] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [stockChartData, setStockChartData] = useState({});
  const [salesChartData, setSalesChartData] = useState({});
  const [categoryChartData, setCategoryChartData] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const showAlert = (message, variant) => {
    const id = Date.now();
    const newAlert = { id, message, variant };
    setAlerts(prev => [...prev, newAlert]);
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const prepareStockChartData = (products, lowStockItems) => {
    const inStockCount = products.length - lowStockItems.length;
    setStockChartData({
      labels: ['In Stock', 'Low Stock'],
      datasets: [
        {
          data: [inStockCount, lowStockItems.length],
          backgroundColor: ['#198754', '#ffc107'],
          borderColor: ['#fff', '#fff'],
          borderWidth: 2,
        },
      ],
    });
  };

  const prepareCategoryChartData = (products) => {
    const categoryMap = {};
    products.forEach((p) => {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    });

    setCategoryChartData({
      labels: Object.keys(categoryMap),
      datasets: [
        {
          label: 'Products per Category',
          data: Object.values(categoryMap),
          backgroundColor: ['#0d6efd', '#6610f2', '#6f42c1', '#198754', '#fd7e14'],
          borderWidth: 1,
        },
      ],
    });
  };

  const prepareSalesChartData = (sales) => {
    const monthlySales = {};
    sales.forEach((sale) => {
      const month = new Date(sale.date).toLocaleString('default', { month: 'short' });
      monthlySales[month] = (monthlySales[month] || 0) + 1;
    });

    setSalesChartData({
      labels: Object.keys(monthlySales),
      datasets: [
        {
          label: 'Monthly Sales',
          data: Object.values(monthlySales),
          fill: false,
          borderColor: '#0d6efd',
          backgroundColor: '#0d6efd',
          tension: 0.3,
        },
      ],
    });
  };

  const fetchData = async () => {
    try {
      const productsRes = await axios.get('http://localhost:3001/products');
      const products = productsRes.data;
      setProductsCount(products.length);

      const lowStockItems = products.filter(p => p.stock <= p.lowStockThreshold);
      setLowStock(lowStockItems);
      prepareStockChartData(products, lowStockItems);
      prepareCategoryChartData(products);

      if (lowStockItems.length > 0) {
        lowStockItems.forEach(item => {
          showAlert(`${item.name}: ${item.stock} units remaining`, 'warning');
        });
      }

      const salesRes = await axios.get('http://localhost:3001/sales');
      setSalesCount(salesRes.data.length);
      prepareSalesChartData(salesRes.data);
    } catch (err) {
      showAlert('Failed to load data. Please check the server.', 'danger');
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="mb-4">📊 Admin Dashboard</h1>

      <div className="summary-cards">
        <Card>
          <Card.Body>
            <div className="icon-box"><FaBoxOpen size={32} /></div>
            <Card.Title>Total Products</Card.Title>
            <Card.Text>{productsCount}</Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="icon-box"><FaChartLine size={32} /></div>
            <Card.Title>Total Sales</Card.Title>
            <Card.Text>{salesCount}</Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="icon-box"><FaExclamationTriangle size={32} /></div>
            <Card.Title>Low Stock Items</Card.Title>
            <Card.Text>{lowStock.length}</Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <div className="icon-box alert-icon"><FaBell size={32} /></div>
            <Card.Title>Alerts</Card.Title>
            <div className="alert-list">
              {alerts.length === 0 ? (
                <p className="text-white">No current alerts</p>
              ) : (
                alerts.map(alert => (
                  <AlertComponent
                    key={alert.id}
                    message={alert.message}
                    variant={alert.variant}
                    onClose={() => removeAlert(alert.id)}
                  />
                ))
              )}
            </div>
          </Card.Body>
        </Card>
      </div>

      <Row className="chart-section">
        <Col md={4} sm={12} className="mb-4">
          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title>Inventory Overview</Card.Title>
              <div className="chart-container">
                {stockChartData.datasets ? (
                  <Doughnut data={stockChartData} options={{ maintainAspectRatio: false }} />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={12} className="mb-4">
          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title>Sales Trend</Card.Title>
              <div className="chart-container">
                {salesChartData.datasets ? (
                  <Line data={salesChartData} options={{ maintainAspectRatio: false }} />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={12} className="mb-4">
          <Card>
            <Card.Body className="d-flex flex-column">
              <Card.Title>Category Distribution</Card.Title>
              <div className="chart-container">
                {categoryChartData.datasets ? (
                  <Bar data={categoryChartData} options={{ maintainAspectRatio: false }} />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
