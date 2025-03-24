// Import required Auth functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCssQWk9fGjJOOdyL27VeuBAe1D47idwvc",
  authDomain: "smartcv-ai.firebaseapp.com",
  projectId: "smartcv-ai",
  storageBucket: "smartcv-ai.appspot.com",
  messagingSenderId: "69724974641",
  appId: "1:69724974641:web:e79c890ce3e4a8c98daf10",
  measurementId: "G-YDSWK0KH6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
