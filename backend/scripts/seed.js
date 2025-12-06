require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const Sale = require('../src/models/Sale');

const CSV_FILE_PATH = path.join(__dirname, '../data/sales.csv');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const count = await Sale.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} records. Skipping seed.`);
      await mongoose.connection.close();
      return;
    }

    const salesData = [];
    const BATCH_SIZE = 1000;

    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', async (row) => {
        const saleRecord = {
          CustomerID: row['Customer ID'],
          CustomerName: row['Customer Name'],
          Phone: row['Phone Number'],
          Gender: row['Gender'],
          Age: row['Age'] ? Number(row['Age']) : null,
          Region: row['Customer Region'],
          CustomerType: row['Customer Type'],
          ProductID: row['Product ID'],
          ProductName: row['Product Name'],
          Brand: row['Brand'],
          Category: row['Product Category'],
          Tags: row['Tags'] ? row['Tags'].split(',').map(t => t.trim()) : [],
          Quantity: row['Quantity'] ? Number(row['Quantity']) : null,
          PricePerUnit: row['Price per Unit'] ? Number(row['Price per Unit']) : null,
          DiscountPercent: row['Discount Percentage'] ? Number(row['Discount Percentage']) : null,
          TotalAmount: row['Total Amount'] ? Number(row['Total Amount']) : null,
          FinalAmount: row['Final Amount'] ? Number(row['Final Amount']) : null,
          Date: row['Date'] ? new Date(row['Date']) : null,
          PaymentMethod: row['Payment Method'],
          OrderStatus: row['Order Status'],
          DeliveryType: row['Delivery Type'],
          StoreID: row['Store ID'],
          StoreLocation: row['Store Location'],
          SalespersonID: row['Salesperson ID'],
          EmployeeName: row['Employee Name']
        };

        salesData.push(saleRecord);

        if (salesData.length >= BATCH_SIZE) {
          await Sale.insertMany(salesData);
          console.log(`Inserted ${BATCH_SIZE} records`);
          salesData.length = 0; // Clear the array
        }
      })
      .on('end', async () => {
        if (salesData.length > 0) {
          await Sale.insertMany(salesData);
          console.log(`Inserted remaining ${salesData.length} records`);
        }
        console.log('CSV processing complete');
        await mongoose.connection.close();
        console.log('Database connection closed');
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        mongoose.connection.close();
      });

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
