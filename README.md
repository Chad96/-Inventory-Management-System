# Requirement Analysis and Functional Design

## Requirement Analysis

The small retail business requires an inventory management system to streamline operations. The key functionalities needed are:

- **Product Management**: Ability to add, update, and delete product information (e.g., product ID, name, description, price).
- **Stock Tracking**: Monitor stock levels for each product and update quantities based on sales or restocking.
- **Restock Notifications**: Alert the user when stock levels fall below a predefined threshold (e.g., 10 units).
- **Sales Tracking**: Record sales transactions, including product sold, quantity, and date.
- **Sales Reporting**: Generate reports summarizing sales over the last 30 days.
- **Supplier Management**: Maintain supplier details and link products to suppliers for restocking purposes.

The system should be user-friendly, scalable, and maintainable, with a simple interface for retail staff to manage inventory and generate reports.

## High-Level Design Document

### Use Case Diagram

**Actors**:
- Retail Staff: Manages products, stock, and sales; views reports and restock notifications.
- System: Handles data storage, processing, and notifications.

**Use Cases**:
- Add/Update/Delete Product
- Update Stock Levels
- Record Sale
- Generate Sales Report
- Receive Low Stock Notification
- Manage Supplier Information

*Use Case Diagram Description*:
- Retail Staff interacts with the system to perform CRUD (Create, Read, Update, Delete) operations on products and stock.
- The system automatically triggers notifications when stock levels are low.
- Sales reports are generated based on user requests for the last 30 days.

### Key System Components and Interactions

**Components**:
- **User Interface (UI)**: Provides forms for managing products, stock, and sales, and displays reports/notifications.
- **Business Logic Layer**: Handles data validation, stock calculations, and notification triggers.
- **Database Layer**: Stores product, stock, sales, and supplier data in a relational database.
- **Notification Module**: Monitors stock levels and alerts users when thresholds are reached.
- **Reporting Module**: Aggregates sales data for reporting.

**Interactions**:
- The UI sends user inputs to the Business Logic Layer for processing.
- The Business Logic Layer interacts with the Database Layer to store or retrieve data.
- The Notification Module queries the Database Layer periodically to check stock levels.
- The Reporting Module retrieves sales data and formats it for display via the UI.

### Data Flow Diagram (DFD)

**Level-0 DFD**:
- **Inputs**: Product details, stock updates, sales transactions, supplier information.
- **Processes**:
  - Manage Products: Add/Update/Delete product records.
  - Manage Stock: Update stock quantities and check thresholds.
  - Record Sales: Log sales transactions.
  - Generate Reports: Summarize sales data.
  - Notify Low Stock: Alert when stock is below threshold.
- **Outputs**: Updated product/stock records, sales reports, low stock notifications.
- **Data Stores**: Product Database, Stock Database, Sales Database, Supplier Database.

*DFD Description*:
- Retail Staff inputs data via the UI, which flows to the Business Logic Layer.
- The Business Logic Layer processes inputs and updates the Database Layer.
- The Notification Module retrieves stock data and sends alerts to the UI.
- The Reporting Module queries sales data and outputs reports to the UI.