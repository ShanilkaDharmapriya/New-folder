// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const journalRoutes = require('./routes/journalRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/journals', journalRoutes);

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Digital Support Backend Running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB Connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch(err => console.error(err));
