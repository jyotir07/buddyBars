require("dotenv").config();

//using .env for sensetive info
const api_key = process.env.API_KEY;
const dbUrl = process.env.BASE_URL;
// Firebase Configuration
const firebaseConfig = {
  apiKey: api_key,
  authDomain: "buddybars-c9915.firebaseapp.com",
  databaseURL: dbUrl,
  projectId: "buddybars-c9915",
  storageBucket: "buddybars-c9915.firebasestorage.app",
  messagingSenderId: "223283177016",
  appId: "1:223283177016:web:1d09bb5d6df854f1bc28cd",
  measurementId: "G-5E71RXW1LS",
};

// Exporting the config object for use in other files
export default firebaseConfig;
