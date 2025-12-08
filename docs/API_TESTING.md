# API Testing Guide for RMS Backend

This guide provides instructions and examples for testing the RMS (Retail Sales Management System) backend APIs.

## Prerequisites

1. Ensure MongoDB is connected and seeded with data (2250 sales records).
2. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:5000` (or PORT from .env).

## Base URL
```
http://localhost:5000/api
```

## API Endpoints

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Check if the server is running.
- **Curl Example**:
  ```bash
  curl -X GET http://localhost:5000/api/health
  ```
- **Expected Response**:
  ```json
  {
    "status": "ok",
    "timestamp": "2025-12-06T17:40:00.000Z"
  }
  ```

### 2. Get All Sales (Limited to 100)
- **Endpoint**: `GET /api/sales`
- **Description**: Retrieve up to 100 sales records.
- **Curl Example**:
  ```bash
  curl -X GET http://localhost:5000/api/sales
  ```
- **Expected Response**:
  ```json
  {
    "count": 100,
    "data": [
      {
        "_id": "693469d7d2f1c45a6c07be40",
        "CustomerID": "CUST-40823",
        "CustomerName": "Neha Khan",
        "Phone": "9720639364",
        "Gender": "Male",
        "Age": 21,
        "Region": "East",
        "CustomerType": "Returning",
        "ProductID": "PROD-8721",
        "ProductName": "Herbal Face Wash",
        "Brand": "SilkSkin",
        "Category": "Beauty",
        "Tags": ["organic", "skincare"],
        "Quantity": 5,
        "PricePerUnit": 4268,
        "DiscountPercent": 12,
        "TotalAmount": 21340,
        "FinalAmount": 18779.2,
        "Date": "2023-03-23T00:00:00.000Z",
        "PaymentMethod": "UPI",
        "OrderStatus": "Cancelled",
        "DeliveryType": "Standard",
        "StoreID": "ST-015",
        "StoreLocation": "Ahmedabad",
        "SalespersonID": "EMP-7554",
        "EmployeeName": "Harsh Agarwal",
        "createdAt": "2025-12-06T17:37:39.310Z",
        "updatedAt": "2025-12-06T17:37:39.310Z",
        "__v": 0
      },
      // ... up to 100 records
    ]
  }
  ```

### 3. Get Sale by ID
- **Endpoint**: `GET /api/sales/:id`
- **Description**: Retrieve a specific sale by its MongoDB ObjectId.
- **Curl Example** (replace `:id` with actual ID, e.g., `693469d7d2f1c45a6c07be40`):
  ```bash
  curl -X GET http://localhost:5000/api/sales/693469d7d2f1c45a6c07be40
  ```
- **Expected Response**: Single sale object (same structure as above).
- **Error Response** (if not found):
  ```json
  {
    "error": "Sale not found"
  }
  ```

### 4. Create a New Sale
- **Endpoint**: `POST /api/sales`
- **Description**: Add a new sales record.
- **Headers**: `Content-Type: application/json`
- **Curl Example**:
  ```bash
  curl -X POST http://localhost:5000/api/sales \
    -H "Content-Type: application/json" \
    -d '{
      "CustomerID": "CUST-99999",
      "CustomerName": "Test User",
      "Phone": "1234567890",
      "Gender": "Female",
      "Age": 30,
      "Region": "North",
      "CustomerType": "New",
      "ProductID": "PROD-9999",
      "ProductName": "Test Product",
      "Brand": "TestBrand",
      "Category": "Test",
      "Tags": ["test"],
      "Quantity": 1,
      "PricePerUnit": 100,
      "DiscountPercent": 10,
      "TotalAmount": 100,
      "FinalAmount": 90,
      "Date": "2025-12-06",
      "PaymentMethod": "Cash",
      "OrderStatus": "Completed",
      "DeliveryType": "Pickup",
      "StoreID": "ST-001",
      "StoreLocation": "Delhi",
      "SalespersonID": "EMP-0001",
      "EmployeeName": "Test Employee"
    }'
  ```
- **Expected Response**: Created sale object with `_id`, `createdAt`, `updatedAt`.

### 5. Update a Sale
- **Endpoint**: `PUT /api/sales/:id`
- **Description**: Update an existing sale by ID.
- **Headers**: `Content-Type: application/json`
- **Curl Example** (replace `:id` with actual ID):
  ```bash
  curl -X PUT http://localhost:5000/api/sales/693469d7d2f1c45a6c07be40 \
    -H "Content-Type: application/json" \
    -d '{"OrderStatus": "Shipped"}'
  ```
- **Expected Response**: Updated sale object.
- **Error Response** (if not found):
  ```json
  {
    "error": "Sale not found"
  }
  ```

### 6. Delete a Sale
- **Endpoint**: `DELETE /api/sales/:id`
- **Description**: Delete a sale by ID.
- **Curl Example** (replace `:id` with actual ID):
  ```bash
  curl -X DELETE http://localhost:5000/api/sales/693469d7d2f1c45a6c07be40
  ```
- **Expected Response**:
  ```json
  {
    "message": "Sale deleted successfully"
  }
  ```
- **Error Response** (if not found):
  ```json
  {
    "error": "Sale not found"
  }
  ```

## Notes
- All responses include standard HTTP status codes (200, 201, 400, 404, 500).
- Use tools like Postman or Insomnia for GUI testing instead of curl.
- The database has 2250 records; use GET /api/sales to browse.
- For production, ensure proper authentication and validation.</content>
<parameter name="filePath">c:\Users\DELL\Desktop\Projects\RMS\docs\API_TESTING.md