// Helper script to set up Firebase Admin SDK & generate environment variable format
const fs = require('fs');
const path = require('path');

try {
    const serviceAccount = require("../config/firebase-service-account.json");
    const envString = JSON.stringify(serviceAccount);

    console.log("\n=== Copy this for production env. ===");
    console.log("FIREBASE_SERVICE_ACCOUNT_KEY=" + envString);
    console.log("\n=== END ===\n");
} 

catch (error) {
    console.error("Error reading service account file:", error.message);
    console.log("Confirm that firebase-service-account.json exists in server/config/");
}