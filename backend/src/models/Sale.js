const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  CustomerID: { type: String, required: true },
  CustomerName: { type: String, required: true },
  Phone: { type: String, required: true },
  Gender: { type: String, required: true },
  Age: { type: Number, required: true },
  Region: { type: String, required: true },
  CustomerType: { type: String, required: true },
  ProductID: { type: String, required: true },
  ProductName: { type: String, required: true },
  Brand: { type: String, required: true },
  Category: { type: String, required: true },
  Tags: [{ type: String }],
  Quantity: { type: Number, required: true },
  PricePerUnit: { type: Number, required: true },
  DiscountPercent: { type: Number, required: true },
  TotalAmount: { type: Number, required: true },
  FinalAmount: { type: Number, required: true },
  Date: { type: Date, required: true },
  PaymentMethod: { type: String, required: true },
  OrderStatus: { type: String, required: true },
  DeliveryType: { type: String, required: true },
  StoreID: { type: String, required: true },
  StoreLocation: { type: String, required: true },
  SalespersonID: { type: String, required: true },
  EmployeeName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
