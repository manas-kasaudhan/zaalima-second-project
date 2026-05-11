# Backend Setup

## 1. Install dependencies

```bash
npm install
```

## 2. Create the environment file

Copy `server/.env.example` to `server/.env` and fill in:

- `MONGODB_URI`
- `XAI_API_KEY`
- `JWT_SECRET`
- `FRONTEND_URL` for your deployed frontend origin

Example local MongoDB URI:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/extensio_ai
```

If MongoDB is not installed locally, use a MongoDB Atlas connection string instead.

Example frontend origin for production:

```env
FRONTEND_URL=https://extensio-ai.vercel.app
```

## 3. Start the backend

```bash
npm start
```

## 4. Verify it works

- Open `http://localhost:5000/`
- Open `http://localhost:5000/api/health`

The health route should return:

- `status: "ok"`
- `database: "connected"`
