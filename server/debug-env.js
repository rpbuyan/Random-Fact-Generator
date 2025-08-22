const dotenv = require('dotenv');
const path = require('path');

// Try multiple paths
const envPaths = [
  '.env',
  '../.env',
  path.join(__dirname, '.env'),
  path.join(__dirname, '../.env')
];

envPaths.forEach(envPath => {
  console.log(`Trying to load: ${envPath}`);
  const result = dotenv.config({ path: envPath });
  console.log(`Result:`, result.error ? 'ERROR' : 'SUCCESS');
});

console.log('FIREBASE_SERVICE_ACCOUNT_KEY:', !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY);