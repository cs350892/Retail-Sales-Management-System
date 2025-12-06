const fs = require('fs');
const path = require('path');
const https = require('https');

// TODO: Replace with actual CSV URL
const CSV_URL = 'https://example.com/sales-data.csv';
const CSV_FILE_PATH = path.join(__dirname, '../../data/sales.csv');

// Simple CSV parser (quick and dirty for now)
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    
    headers.forEach((header, index) => {
      let value = values[index]?.trim() || '';
      
      // Try to convert numbers
      if (!isNaN(value) && value !== '') {
        value = parseFloat(value);
      }
      
      row[header] = value;
    });
    
    data.push(row);
  }
  
  return data;
}

// Download CSV if needed
function downloadCSV(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('CSV downloaded successfully');
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if error
      reject(err);
    });
  });
}

// Load data (either from file or download)
async function loadSalesData() {
  try {
    // Check if we already have the file locally
    if (fs.existsSync(CSV_FILE_PATH)) {
      console.log('Loading sales data from local file...');
      const csvText = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
      return parseCSV(csvText);
    }
    
    // If not, try to download (this will probably fail with example.com)
    console.log('Attempting to download CSV...');
    const dataDir = path.dirname(CSV_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    await downloadCSV(CSV_URL, CSV_FILE_PATH);
    const csvText = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    return parseCSV(csvText);
    
  } catch (error) {
    console.error('Error loading sales data:', error.message);
    // Return some dummy data for testing
    return [
      { id: 1, product: 'Widget A', quantity: 10, price: 25.50, date: '2024-01-01' },
      { id: 2, product: 'Widget B', quantity: 5, price: 45.00, date: '2024-01-02' },
      { id: 3, product: 'Widget C', quantity: 15, price: 15.75, date: '2024-01-03' }
    ];
  }
}

module.exports = { loadSalesData };
