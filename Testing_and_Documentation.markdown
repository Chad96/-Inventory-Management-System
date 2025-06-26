# Testing and Documentation

## Test Cases

### Test Case 1: Add Product
- **Description**: Verify that a new product can be added to the system.
- **Steps**:
  1. Enter product name, description, price, and stock threshold in the "Manage Products" section.
  2. Click "Add Product".
- **Expected Result**: Product appears in the product dropdown, and fields are cleared.
- **Actual Result**: Product is added successfully, and dropdown updates.
- **Status**: Pass

### Test Case 2: Update Stock
- **Description**: Verify that stock levels can be updated for a product.
- **Steps**:
  1. Select a product from the dropdown.
  2. Enter a new stock quantity.
  3. Click "Update Stock".
- **Expected Result**: Stock level updates, and low stock notification triggers if applicable.
- **Actual Result**: Stock updates correctly; notifications appear if stock falls below threshold.
- **Status**: Pass

### Test Case 3: Generate Sales Report
- **Description**: Verify that the system generates a sales report for the last 30 days.
- **Steps**:
  1. Click "Generate Report" in the "Sales Report" section.
- **Expected Result**: Report displays sales data with product names, quantities, and total amount.
- **Actual Result**: Report is generated correctly with accurate totals.
- **Status**: Pass

### Test Case 4: Low Stock Notification
- **Description**: Verify that the system notifies when stock levels are low.
- **Steps**:
  1. Set a product's stock quantity below its threshold.
  2. Check the "Notifications" section.
- **Expected Result**: Notification appears listing the product and its stock details.
- **Actual Result**: Notifications display correctly for low stock products.
- **Status**: Pass

### Known Bugs and Areas for Improvement
- **Bug**: No validation for negative prices or thresholds in the "Add Product" form.
- **Improvement**: Add input validation to prevent invalid data entry.
- **Bug**: Sales report does not handle empty sales data gracefully.
- **Improvement**: Display a "No sales found" message when no data exists.
- **Improvement**: Integrate with a real database instead of in-memory data for persistence.

## User Guide

### Setup
1. Open `index.html` in a modern web browser (e.g., Chrome, Firefox).
2. Ensure an internet connection for loading Tailwind CSS.
3. No additional setup is required as the prototype uses in-memory data.

### Usage
- **Add a Product**:
  1. In the "Manage Products" section, enter the product name, description, price, and stock threshold.
  2. Click "Add Product" to save the product.
- **Update Stock**:
  1. In the "Manage Stock" section, select a product from the dropdown.
  2. Enter the new stock quantity and click "Update Stock".
- **Generate Sales Report**:
  1. In the "Sales Report" section, click "Generate Report" to view sales from the last 30 days.
- **View Notifications**:
  1. Check the "Notifications" section for low stock alerts, updated automatically when stock changes.

### Notes
- The prototype uses in-memory data, so refreshing the page resets all data.
- Ensure valid numerical inputs for price, threshold, and quantity to avoid errors.