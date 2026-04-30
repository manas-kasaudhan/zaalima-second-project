const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes (to be added)
app.get('/', (req, res) => {
  res.send('Extensio.ai API is running...');
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
