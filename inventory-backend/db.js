require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'inventory_management',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

module.exports = connection;
