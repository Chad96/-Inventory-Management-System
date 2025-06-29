import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './SalesReport.css';

function SalesReport({ addAlert }) {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ productId: '', quantity: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const salesRes = await axios.get('http://localhost:3001/sales?_expand=product');
      const recentSales = salesRes.data.filter(sale => new Date(sale.saleDate) >= thirtyDaysAgo);
      setSales(recentSales);
      const productsRes = await axios.get('http://localhost:3001/products');
      setProducts(productsRes.data);
    } catch (err) {
      addAlert('Failed to load data.', 'danger');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecordSale = async (e) => {
    e.preventDefault();
    try {
      const product = products.find(p => p.id === parseInt(formData.productId));
      if (!product) throw new Error('Invalid product.');
      if (product.stock < parseInt(formData.quantity)) throw new Error('Insufficient stock.');
      await axios.post('http://localhost:3001/sales', {
        productId: parseInt(formData.productId),
        quantity: parseInt(formData.quantity),
        totalPrice: product.price * parseInt(formData.quantity),
        saleDate: new Date().toISOString()
      });
      await axios.patch(`http://localhost:3001/products/${formData.productId}`, {
        stock: product.stock - parseInt(formData.quantity)
      });
      addAlert('Sale recorded successfully.', 'success');
      fetchData();
      setShowModal(false);
      setFormData({ productId: '', quantity: '' });
    } catch (err) {
      addAlert(err.message, 'danger');
    }
  };

  return (
    <div className="sales-report-container">
      <h1>Sales Report (Last 30 Days)</h1>
      <Button onClick={() => setShowModal(true)} className="mb-3 btn-record">
        Record Sale
      </Button>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id}>
                <td>{sale.product?.name}</td>
                <td>{sale.quantity}</td>
                <td>${sale.totalPrice}</td>
                <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Record Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRecordSale}>
            <Form.Group className="mb-3" controlId="formProduct">
              <Form.Label>Product</Form.Label>
              <Form.Select
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SalesReport;
