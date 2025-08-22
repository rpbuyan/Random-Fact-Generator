const admin = require('firebase-admin');

// We use JSON format for seeding since it is the most reliable format for data transfer
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY env var is required for seeding the database");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id
    });
}

const db = admin.firestore();

console.log(`Firebase initialized for project: ${serviceAccount.project_id}`);

module.exports = { admin, db };