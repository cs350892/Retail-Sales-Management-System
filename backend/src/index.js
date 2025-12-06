const express = require('express');
const { loadSalesData } = require('./utils/loadData');

const app = express();
const PORT = process.env.PORT || 5000;

// Load sales data at startup
let salesData = [];

(async () => {
  console.log('Loading sales data...');
  salesData = await loadSalesData();
  console.log(`Loaded ${salesData.length} sales records`);
})();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to RMS API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sales data endpoint
app.get('/api/sales', (req, res) => {
  res.json({ 
    count: salesData.length,
    data: salesData 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
