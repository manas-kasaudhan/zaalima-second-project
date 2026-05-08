# Extensio.ai

Extensio.ai is a full-stack Chrome extension generator built with a React/Vite frontend and an Express/MongoDB backend.

## Stack

- Frontend: React, Vite, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose
- Packaging: Archiver

## Local Setup

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 3. Create environment files

Frontend:

- Copy `.env.example` to `.env`
- Set `VITE_API_BASE_URL`

Example:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Backend:

- Copy `server/.env.example` to `server/.env`
- Set:
  - `MONGODB_URI`
  - `OPENAI_API_KEY`
  - `JWT_SECRET`
  - `FRONTEND_URL` for the deployed frontend origin

See [server/README.md](C:/Users/MOYIN/Downloads/zaalima-second-project-main/zaalima-second-project-main/server/README.md) for backend setup details.

## Run Locally

Start the backend:

```bash
cd server
npm start
```

Start the frontend in a second terminal:

```bash
npm run dev
```

## Build

Frontend production build:

```bash
npm run build
```

## Deployment Notes

- Do not commit `.env` or `server/.env`
- Use `.env.example` and `server/.env.example` as safe templates
- Frontend hosting can use `VITE_API_BASE_URL` pointing to your deployed backend
- Backend hosting should set `MONGODB_URI`, `OPENAI_API_KEY`, `JWT_SECRET`, and `FRONTEND_URL` in the host dashboard
