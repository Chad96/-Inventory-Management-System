const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new product
app.post('/products', (req, res) => {
  const { name, description, price, stock_threshold } = req.body;
  const query = 'INSERT INTO Products (name, description, price, stock_threshold) VALUES (?, ?, ?, ?)';
  db.query(query, [name, description, price, stock_threshold], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Product added', id: result.insertId });
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
