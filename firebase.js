// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCPjY0MQj_ZkDcM_kzNnC9O-LXz5TQbifg",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messagingSenderId",
  appId: "your-app-id"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Correct export
const auth = getAuth(app);
export { auth };
