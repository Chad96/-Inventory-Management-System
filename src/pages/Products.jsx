import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './Products.css';

function Products({ addAlert }) {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    lowStockThreshold: 10,
    supplierId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsRes = await axios.get('http://localhost:3001/products?_expand=supplier');
      setProducts(productsRes.data);
      const suppliersRes = await axios.get('http://localhost:3001/suppliers');
      setSuppliers(suppliersRes.data);
    } catch (err) {
      addAlert('Failed to load data.', 'danger');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        lowStockThreshold: parseInt(formData.lowStockThreshold),
        supplierId: parseInt(formData.supplierId)
      };
      if (editProduct) {
        await axios.put(`http://localhost:3001/products/${editProduct.id}`, payload);
        addAlert('Product updated successfully.', 'success');
      } else {
        await axios.post('http://localhost:3001/products', payload);
        addAlert('Product added successfully.', 'success');
      }
      fetchData();
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        lowStockThreshold: 10,
        supplierId: ''
      });
      setEditProduct(null);
      setShowForm(false);
    } catch (err) {
      addAlert('Failed to save product.', 'danger');
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      supplierId: product.supplierId
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      addAlert('Product deleted successfully.', 'success');
      fetchData();
    } catch (err) {
      addAlert('Failed to delete product.', 'danger');
    }
  };

  return (
    <div className="products-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📦 Products</h2>
        <Button
          variant="success"
          onClick={() => {
            setShowForm(true);
            setEditProduct(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              category: '',
              stock: '',
              lowStockThreshold: 10,
              supplierId: ''
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <FaPlus className="me-2" />
          Add Product
        </Button>
      </div>

      {showForm && (
        <div className="form-card shadow-sm p-4 rounded bg-white mb-5">
          <h4 className="fw-semibold mb-3">{editProduct ? 'Edit Product' : 'Add Product'}</h4>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3 form-group">
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6 mb-3 form-group">
                <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control type="text" name="description" value={formData.description} onChange={handleInputChange} />
              </div>
              <div className="col-md-6 mb-3 form-group">
                <Form.Label className="fw-bold">Price</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6 mb-3 form-group">
                <Form.Label className="fw-bold">Category</Form.Label>
                <Form.Control type="text" name="category" value={formData.category} onChange={handleInputChange} />
              </div>
              <div className="col-md-6 mb-3 form-group">
                <Form.Label className="fw-bold">Stock</Form.Label>
                <Form.Control type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6 mb-3 form-group">
                <Form.Label className="fw-bold">Low Stock Threshold</Form.Label>
                <Form.Control type="number" name="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleInputChange} />
              </div>
              <div className="col-md-12 mb-3 form-group">
                <Form.Label className="fw-bold">Supplier</Form.Label>
                <Form.Select name="supplierId" value={formData.supplierId} onChange={handleInputChange} required>
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="text-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => {
                  setShowForm(false);
                  setEditProduct(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editProduct ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form>
        </div>
      )}

      <div className="card shadow-sm table-card">
        <div className="card-body table-responsive">
          <Table striped hover responsive className="mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td>R {parseFloat(product.price).toFixed(2)}</td>
                  <td>{product.supplier?.name || '-'}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(product)} className="me-2">
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Products;
