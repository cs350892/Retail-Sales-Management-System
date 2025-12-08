const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

router.get('/', async (req, res) => {
  try {
    console.log('Sales API called with query:', req.query)

    const page = Math.max(parseInt(req.query.page) || 1, 1)
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100)
    const skip = (page - 1) * limit

    const {
      search = '',
      regions = '', // comma-separated
      genders = '',
      categories = '',
      tags = '',
      payments = '',
      ageMin = '',
      ageMax = '',
      dateFrom = '',
      dateTo = '',
      sort = 'date-desc' // date-desc, qty-desc, name-asc
    } = req.query

    const query = {}

    // Text search across name and phone
    if (search) {
      query.$or = [
        { CustomerName: { $regex: search, $options: 'i' } },
        { Phone: { $regex: search, $options: 'i' } }
      ]
    }

    const toArray = (val) => String(val).split(',').map(v => v.trim()).filter(Boolean)

    const regionArr = toArray(regions)
    const genderArr = toArray(genders)
    const categoryArr = toArray(categories)
    const tagsArr = toArray(tags)
    const paymentsArr = toArray(payments)

    if (regionArr.length) query.Region = { $in: regionArr }
    if (genderArr.length) query.Gender = { $in: genderArr }
    if (categoryArr.length) query.Category = { $in: categoryArr }
    if (paymentsArr.length) query.PaymentMethod = { $in: paymentsArr }
    if (tagsArr.length) query.Tags = { $in: tagsArr }

    const ageRange = {}
    if (ageMin) ageRange.$gte = Number(ageMin)
    if (ageMax) ageRange.$lte = Number(ageMax)
    if (Object.keys(ageRange).length) query.Age = ageRange

    const dateRange = {}
    if (dateFrom) dateRange.$gte = new Date(dateFrom)
    if (dateTo) dateRange.$lte = new Date(dateTo)
    if (Object.keys(dateRange).length) query.Date = dateRange

    // Sorting
    const sortMap = {
      'date-desc': { Date: -1 },
      'qty-desc': { Quantity: -1 },
      'name-asc': { CustomerName: 1 }
    }
    const sortSpec = sortMap[sort] || sortMap['date-desc']

    console.log('MongoDB query:', query)
    console.log('Sort:', sortSpec, 'skip:', skip, 'limit:', limit)

    const [total, sales] = await Promise.all([
      Sale.countDocuments(query),
      Sale.find(query).sort(sortSpec).skip(skip).limit(limit)
    ])

    const totalPages = Math.ceil(total / limit)
    const response = { data: sales, total, page, totalPages }
    console.log('Sending response:', { total, page, totalPages, dataLength: sales.length })
    res.json(response)
  } catch (error) {
    console.error('Sales route error:', error)
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
