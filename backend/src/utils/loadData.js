const fs = require('fs');
const path = require('path');
const Sale = require('../models/Sale');

const CSV_FILE_PATH = path.join(__dirname, '../../data/sales.csv');

function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/['"]/g, ''));
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    
    headers.forEach((header, index) => {
      let value = values[index]?.trim().replace(/['"]/g, '') || '';
      
      if (!isNaN(value) && value !== '') {
        value = parseFloat(value);
      }
      
      const fieldMap = {
        'Customer ID': 'customerId',
        'Customer Name': 'customerName',
        'Phone Number': 'phoneNumber',
        'Gender': 'gender',
        'Age': 'age',
        'Customer Region': 'customerRegion',
        'Customer Type': 'customerType',
        'Product ID': 'productId',
        'Product Name': 'productName',
        'Brand': 'brand',
        'Product Category': 'productCategory',
        'Tags': 'tags',
        'Quantity': 'quantity',
        'Price per Unit': 'pricePerUnit',
        'Discount Percentage': 'discountPercentage',
        'Total Amount': 'totalAmount',
        'Final Amount': 'finalAmount',
        'Date': 'date',
        'Payment Method': 'paymentMethod',
        'Order Status': 'orderStatus',
        'Delivery Type': 'deliveryType',
        'Store ID': 'storeId',
        'Store Location': 'storeLocation',
        'Salesperson ID': 'salespersonId',
        'Employee Name': 'employeeName'
      };
      
      const mappedKey = fieldMap[header] || header;
      row[mappedKey] = value;
    });
    
    data.push(row);
  }
  
  return data;
}

async function importCSVToMongoDB() {
  try {
    if (!fs.existsSync(CSV_FILE_PATH)) {
      console.log('CSV file not found');
      return;
    }
    
    const csvText = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    const salesData = parseCSV(csvText);
    
    await Sale.deleteMany({});
    await Sale.insertMany(salesData);
    
    console.log(`Imported ${salesData.length} sales records to MongoDB`);
  } catch (error) {
    console.error('Error importing CSV to MongoDB:', error.message);
  }
}

module.exports = { importCSVToMongoDB };
