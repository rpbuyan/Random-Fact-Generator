const express = require('express');
const cors = require('cors');
require('dotenv').config();

const factsService = require('./services/factsService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware components
app.use(cors());
app.use(express.json());

// Routes

// Adds a new fact to Firebase
app.get('/api/facts/random', async (req, res) => {
    try {
      const fact = await factsService.getRandomFact();
      res.json(fact);
    }

    catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.get('/api/facts', async (req, res) => {
  try {
    const facts = await factsService.getAllFacts();
    res.json(facts);
  }

  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 
app.get('/api/facts/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const facts = await factsService.getFactsByCategory(category);
    res.json(facts);
  }

  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/facts', async (req, res) => {
  try {
    const fact = await factsService.addFact(req.body);
    res.status(201).json(fact);
  }

  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});