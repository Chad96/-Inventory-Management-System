import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Suppliers.css';

function Suppliers({ addAlert }) {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/suppliers');
      setSuppliers(response.data);
    } catch (err) {
      addAlert('Failed to load suppliers.', 'danger');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editSupplier) {
        await axios.put(`http://localhost:3001/suppliers/${editSupplier.id}`, formData);
        addAlert('Supplier updated successfully.', 'success');
      } else {
        await axios.post('http://localhost:3001/suppliers', formData);
        addAlert('Supplier added successfully.', 'success');
      }
      fetchData();
      setShowModal(false);
      setFormData({ name: '', contact: '', email: '' });
      setEditSupplier(null);
    } catch (err) {
      addAlert('Failed to save supplier.', 'danger');
    }
  };

  const handleEdit = (supplier) => {
    setEditSupplier(supplier);
    setFormData(supplier);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/suppliers/${id}`);
      addAlert('Supplier deleted successfully.', 'success');
      fetchData();
    } catch (err) {
      addAlert('Failed to delete supplier.', 'danger');
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
      <h1>Suppliers</h1>
      <Button onClick={() => setShowModal(true)} className="mb-3">
        Add Supplier
      </Button>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.contact}</td>
                <td>{supplier.email}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleEdit(supplier)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(supplier.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editSupplier ? 'Edit Supplier' : 'Add Supplier'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Suppliers;