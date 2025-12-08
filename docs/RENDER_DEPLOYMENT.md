# Deployment Guide (Render.com)

This guide walks you through deploying the RMS backend (Node/Express) and frontend (Vite React) on Render.

## Prerequisites
- GitHub repository: `cs350892/Retail-Sales-Management-System`
- MongoDB Atlas cluster (or any reachable MongoDB). Copy the connection string.
- Render account with GitHub connected

## 1) Backend API (Render Web Service)
1. In Render, click New → Web Service.
2. Select your repo and pick the `backend` folder as the root.
3. Settings:
   - Name: `rms-backend`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`
   - Environment: `Node 18+`
4. Environment Variables:
   - `PORT=10000` (Render assigns `PORT`; you can read it via `process.env.PORT` already)
   - `MONGO_URI=<your MongoDB connection string>`
5. Click Create Web Service. Wait for build and deploy to finish.
6. Copy the service URL, e.g., `https://rms-backend.onrender.com`.
   - Health check: `GET https://rms-backend.onrender.com/api/health`

Notes
- Your backend already uses `process.env.PORT || 5000` and `MONGO_URI`.
- CORS is enabled via `app.use(cors())`.

## 2) Frontend (Render Static Site)
Option A: Deploy as a static site (recommended for Vite)
1. New → Static Site.
2. Repository: same repo, Root Directory: `frontend`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `dist`
5. Environment Variables:
   - `VITE_API_BASE_URL=https://rms-backend.onrender.com/api`
6. Create Static Site. After deploy, open the URL.

Option B: Web Service (if you need SSR or custom server)
- Use a minimal Node server to serve `dist`. Not required for standard Vite.

## 3) Verify End-to-End
- Open the frontend Render URL.
- The app should call API at `VITE_API_BASE_URL`.
- Check Network tab for requests like `/api/sales?page=1&limit=10`.

## 4) Environment Configuration
- Frontend
  - `.env` (Render environment settings UI): `VITE_API_BASE_URL=https://<your-backend>/api`
- Backend
  - `.env` (Render environment settings UI):
    - `MONGO_URI=<atlas-uri>`
    - `PORT` is auto-provided by Render.

## 5) Common Issues
- 404/connection refused: Ensure backend deploy succeeded and health check works.
- CORS blocked: Backend has `cors()` enabled. If needed, restrict origin:
  ```js
  app.use(cors({ origin: 'https://your-frontend.onrender.com' }))
  ```
- Mongo connection fails: Re-check `MONGO_URI`, IP allowlist, and user credentials.

## 6) Optional: Seed Data
If you need initial data:
- Temporarily run the seed script locally pointing to Atlas:
```powershell
cd backend
$env:MONGO_URI="<atlas-uri>"
npm run seed
```

## 7) Branches & Auto Deploys
- Render can auto-deploy on `main` push.
- For preview environments, point to branches; set `VITE_API_BASE_URL` to the corresponding backend preview URL.

## 8) URLs Summary
- Backend: `https://<your-backend>.onrender.com/api`
- Frontend: `https://<your-frontend>.onrender.com`

## 9) Local to Cloud Checklist
- Works locally with `.env` values.
- Pushed latest code to `main`.
- Backend Web Service healthy on Render.
- Frontend Static Site built and serving.
- Frontend `.env` var points to backend URL.

---
If you want, I can add a minimal Render `render.yaml` for one-click setup.
