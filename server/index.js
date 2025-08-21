const express = require('express');
const cors = require('cors');
require('dotenv').config();

const factsService = require('./services/factsService');

const app = express();
const PORT = process.env.PORT || 5000;

// Implement Firebase error handling to check successful connection
let db = null;
let firebaseError = null;

try {
  console.log("Attempting to initialize Firebase...");
  console.log("NODE_ENV: ", process.env.NODE_ENV);
  console.log("FIREBASE_SERVICE_ACCOUNT_KEY: ", !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

  const firebaseConfig = require('./config/firebase');
  db = firebaseConfig.db;
  console.log('✅ Firebase initialized successfully');
} 

catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
  firebaseError = error.message;
}

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

// Health check endpoints
app.get("/api/health", async (req, res) => {
  try {
    await db.collection('_health').doc('test').set({
      status: 'ok',
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({
      status: 'ok',
      firebase: 'connection successful',
      environment: process.nextTick.NODE_ENV || 'development',
    });
  }

  catch (error) {
    res.status(500).json({
      status: 'error',
      firebase: 'disconnected',
      error: error.message
    });
  }
});

// Implemented a scenario to handle when Firebase isn't connecting
app.get("/api/health", async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({
        status: 'error',
        firebase: 'disconnected',
        error: 'Firebase not initializing - check environment variables'
      });
    }

    await db.collection('_health').doc('test').set({
      status: 'ok',
      timestamp: new Date()
    });

    res.json({
      status: 'ok',
      firebase: ' connected',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  }

  catch (error) {
    res.status(500).json({
      status: 'error',
      firebase: 'disconnected',
      error: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Firebase: ${db ? 'Connected' : 'Disconnected'}`);
});