const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  CustomerID: String,
  CustomerName: String,
  Phone: String,
  Gender: String,
  Age: Number,
  Region: String,
  CustomerType: String,
  ProductID: String,
  ProductName: String,
  Brand: String,
  Category: String,
  Tags: [String],
  Quantity: Number,
  PricePerUnit: Number,
  DiscountPercent: Number,
  TotalAmount: Number,
  FinalAmount: Number,
  Date: Date,
  PaymentMethod: String,
  OrderStatus: String,
  DeliveryType: String,
  StoreID: String,
  StoreLocation: String,
  SalespersonID: String,
  EmployeeName: String
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
