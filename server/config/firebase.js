const admin = require('firebase-admin');
const path = require('path');

let db = null;

try {
  let serviceAccount;
  
  if (process.env.NODE_ENV === 'production') {
    // Production: Use environment variable
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is required in production');
    }
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  } else {
    // Development: Use local file
    serviceAccount = require('./firebase-service-account.json');
  }

  // Initialize Firebase Admin
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id
    });
  }

  db = admin.firestore();
  
  console.log(`Firebase initialized for project: ${serviceAccount.project_id}`);

} catch (error) {
  console.error('Firebase initialization failed:', error.message);
  throw error;
}

module.exports = { admin, db };