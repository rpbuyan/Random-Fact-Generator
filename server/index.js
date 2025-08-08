const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware components
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/facts/random', (req, res) => {
  res.json({ message: 'Random fact endpoint' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});