const admin = require('firebase-admin');

let serviceAccount;
let db = null;

try {
  if (process.env.NODE_ENV === 'production') {
    // Production: Use environment variable
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is required in production');
    }
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    
  } else {
    // Development: Use local file
    try {
      serviceAccount = require('./firebase-service-account.json');
    } catch (fileError) {
      console.warn('Local service account file not found, falling back to environment variables');
      
      // Fallback to individual env vars for development
      if (!process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_PROJECT_ID) {
        throw new Error('Either firebase-service-account.json file or complete environment variables are required');
      }
      
      serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs"
      };
    }
  }

  // Initialize Firebase Admin
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.project_id
    });
  }

  db = admin.firestore();     // Assign Firestore instance to db so it can be used globally
  
  console.log(`Firebase initialized for project: ${serviceAccount.project_id}`);
  

} catch (error) {
  console.error('Firebase initialization failed:', error.message);
  throw error;
}

module.exports = { admin, db };