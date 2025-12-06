# RMS - Retail Sales Management System

A full-stack MERN application for managing retail sales data.

## Project Structure

```
RMS/
├── backend/
│   ├── data/
│   │   └── sales.csv
│   ├── scripts/
│   │   └── seed.js
│   ├── src/
│   │   ├── models/
│   │   │   └── Sale.js
│   │   ├── routes/
│   │   │   └── sales.js
│   │   ├── utils/
│   │   │   └── loadData.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── docs/
│   └── SETUP.md
├── .gitignore
├── package.json
└── README.md
```

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- csv-parser

### Frontend
- React (JavaScript)
- Vite
- CSS

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/cs350892/Retail-Sales-Management-System.git
cd RMS
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rms?retryWrites=true&w=majority
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

### Step 3: Download CSV Data

Download the sales dataset from:
https://drive.google.com/file/d/1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb/view?usp=sharing

Save it as `backend/data/sales.csv`

### Step 4: Seed Database

```bash
npm run seed
```

This will import all CSV data into MongoDB. The script:
- Converts numeric fields to Number type
- Converts Date to Date object
- Splits Tags into array
- Only runs if database is empty

### Step 5: Start Backend Server

```bash
npm run dev
```

Backend will run on http://localhost:5000

### Step 6: Frontend Setup

Open new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:5173

### Step 7: Run Both Servers (Optional)

From root directory:
```bash
npm install
npm run dev
```

## API Endpoints

### Sales Endpoints

- `GET /api/sales` - Get all sales (limited to 100)
- `GET /api/sales/:id` - Get single sale by ID
- `POST /api/sales` - Create new sale
- `PUT /api/sales/:id` - Update sale
- `DELETE /api/sales/:id` - Delete sale

### Health Check

- `GET /` - Welcome message
- `GET /api/health` - Server health status

## Sales Data Schema

```javascript
{
  customerId: String,
  customerName: String,
  phoneNumber: String,
  gender: String,
  age: Number,
  customerRegion: String,
  customerType: String,
  productId: String,
  productName: String,
  brand: String,
  productCategory: String,
  tags: [String],
  quantity: Number,
  pricePerUnit: Number,
  discountPercentage: Number,
  totalAmount: Number,
  finalAmount: Number,
  date: Date,
  paymentMethod: String,
  orderStatus: String,
  deliveryType: String,
  storeId: String,
  storeLocation: String,
  salespersonId: String,
  employeeName: String
}
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Import CSV data to MongoDB

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Root
- `npm run dev:backend` - Start backend only
- `npm run dev:frontend` - Start frontend only
- `npm run dev` - Start both servers with concurrently

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Git Ignore

The following are ignored:
- node_modules/
- .env
- *.csv
- dist/
- build/
- *.log

## Troubleshooting

### MongoDB Connection Issues
- Verify MONGO_URI in .env
- Check MongoDB Atlas IP whitelist
- Ensure database user has proper permissions

### CSV Import Issues
- Ensure CSV file is in `backend/data/sales.csv`
- Check CSV column names match expected format
- Verify file encoding is UTF-8

### Port Already in Use
- Change PORT in backend/.env
- Kill process using the port

## License

ISC
