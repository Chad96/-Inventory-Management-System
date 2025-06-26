-- Creating the database for the inventory management system
CREATE DATABASE inventory_management;
USE inventory_management;

-- Table for Products
CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_threshold INT NOT NULL DEFAULT 10
);

-- Table for Suppliers
CREATE TABLE Suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(255),
    address TEXT
);

-- Table for Stock
CREATE TABLE Stock (
    stock_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    quantity INT NOT NULL,
    last_updated DATE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- Table for Sales
CREATE TABLE Sales (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    quantity INT NOT NULL,
    sale_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- Table for Product-Supplier Relationship
CREATE TABLE Product_Supplier (
    product_id INT,
    supplier_id INT,
    PRIMARY KEY (product_id, supplier_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id) ON DELETE CASCADE
);

-- Sample data for testing
INSERT INTO Products (name, description, price, stock_threshold) VALUES
('Laptop', 'High-performance laptop', 999.99, 10),
('Mouse', 'Wireless mouse', 29.99, 20);

INSERT INTO Suppliers (name, contact_info, address) VALUES
('Tech Supplier', 'tech@supplier.com', '123 Tech St'),
('Gadget Co', 'contact@gadgetco.com', '456 Gadget Rd');

INSERT INTO Stock (product_id, quantity, last_updated) VALUES
(1, 15, '2025-06-26'),
(2, 25, '2025-06-26');

INSERT INTO Sales (product_id, quantity, sale_date, total_amount) VALUES
(1, 2, '2025-06-25', 1999.98),
(2, 5, '2025-06-24', 149.95);

INSERT INTO Product_Supplier (product_id, supplier_id) VALUES
(1, 1),
(2, 2);