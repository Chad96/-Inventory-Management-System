import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Container } from 'react-bootstrap';
import './Suppliers.css';

function Suppliers({ addAlert }) {
  const [suppliers, setSuppliers] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
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
      setShowPanel(false);
      setFormData({ name: '', contact: '', email: '' });
      setEditSupplier(null);
    } catch (err) {
      addAlert('Failed to save supplier.', 'danger');
    }
  };

  const handleEdit = (supplier) => {
    setEditSupplier(supplier);
    setFormData(supplier);
    setShowPanel(true);
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
    <Container className="suppliers-container">
      <div className="suppliers-header">
        <h2>Suppliers</h2>
        <Button className="btn-modern" onClick={() => {
          setFormData({ name: '', contact: '', email: '' });
          setEditSupplier(null);
          setShowPanel(true);
        }}>
          + Add Supplier
        </Button>
      </div>

      <div className="content-wrapper">
        <div className="table-container">
          <Table responsive bordered className="modern-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.email}</td>
                  <td>
                    <div className="d-flex gap-2 flex-wrap">
                      <Button variant="outline-primary" size="sm" onClick={() => handleEdit(supplier)}>
                        Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(supplier.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {showPanel && (
          <div className="side-panel">
            <div className="panel-header">
              <h5>{editSupplier ? 'Edit Supplier' : 'Add Supplier'}</h5>
              <Button variant="light" size="sm" onClick={() => setShowPanel(false)}>✕</Button>
            </div>
            <Form onSubmit={handleSubmit} className="modern-form">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter full name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" className="btn-modern-save">
                  Save Supplier
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Suppliers;
