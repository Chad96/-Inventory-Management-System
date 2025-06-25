import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import './Dashboard.css';

// Chart.js
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ addAlert }) {
  const [lowStock, setLowStock] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [stockChartData, setStockChartData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const prepareChartData = (products, lowStockItems) => {
    const inStockCount = products.length - lowStockItems.length;
    setStockChartData({
      labels: ['In Stock', 'Low Stock'],
      datasets: [
        {
          data: [inStockCount, lowStockItems.length],
          backgroundColor: ['#0d6efd', '#ffc107'],
          borderColor: ['#ffffff', '#ffffff'],
          borderWidth: 2,
        },
      ],
    });
  };

  const fetchData = async () => {
    try {
      const productsRes = await axios.get('http://localhost:3001/products');
      setProductsCount(productsRes.data.length);
      const lowStockItems = productsRes.data.filter(p => p.stock <= p.lowStockThreshold);
      setLowStock(lowStockItems);

      prepareChartData(productsRes.data, lowStockItems);

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
    <div className="dashboard-container">
      <h1 className="mb-4">Dashboard</h1>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>{productsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <Card.Text>{salesCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Inventory Overview</Card.Title>
              <div className="chart-container">
                {stockChartData.datasets ? (
                  <Doughnut
                    data={stockChartData}
                    options={{ maintainAspectRatio: false }}
                  />
                ) : (
                  <p>Loading chart...</p>
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
