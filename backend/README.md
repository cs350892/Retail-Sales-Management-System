# RMS Backend

Backend API built with Node.js and Express.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/rms
```

Ensure MongoDB is running locally or provide a valid connection string for `MONGO_URI`. Without this, the server will fail to start and the frontend will see `ERR_CONNECTION_REFUSED`.
