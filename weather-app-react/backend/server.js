// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const outfitHistoryRoutes = require('./routes/outfitHistory');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/outfit-history', outfitHistoryRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
