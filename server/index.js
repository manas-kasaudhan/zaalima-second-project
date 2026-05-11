const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

// Environment Validation
const requiredEnvVars = ['MONGODB_URI', 'XAI_API_KEY', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error('FATAL ERROR: Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Create server/.env from server/.env.example before starting the API.');
  process.exit(1);
}

const app = express();
const allowedOrigins = [process.env.FRONTEND_URL, process.env.VERCEL_URL, 'http://localhost:5173'].filter(Boolean);

// Middleware
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json({ limit: '1mb' }));

// Routes (to be added)
app.get('/', (req, res) => {
  res.send('Extensio.ai API is running...');
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const generatorRoutes = require('./routes/generatorRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/generate', generatorRoutes);
app.use('/api/projects', projectRoutes);

// Static folder for downloads
app.use('/downloads', express.static(path.join(__dirname, 'tmp')));

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error');
    console.error(`MONGODB_URI: ${maskMongoUri(process.env.MONGODB_URI)}`);
    console.error(`Reason: ${error.message}`);
    console.error('Make sure the MongoDB URI is correct and the database server allows connections from this machine.');
    process.exit(1);
  }
}

function maskMongoUri(uri) {
  if (!uri) return 'missing';

  return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
}

startServer();
