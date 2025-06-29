// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPjY0MQj_ZkDcM_kzNnC9O-LXz5TQbifg",
  authDomain: "inventoryapp-6a67b.firebaseapp.com",
  projectId: "inventoryapp-6a67b",
  storageBucket: "inventoryapp-6a67b.firebasestorage.app",
  messagingSenderId: "502806555309",
  appId: "1:502806555309:web:fc4233684e230ad783b424"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export the `auth` object
export const auth = getAuth(app);
