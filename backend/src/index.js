require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const salesRoutes = require('./routes/sales');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to RMS API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/sales', salesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
