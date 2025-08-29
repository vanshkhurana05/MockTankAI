// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAAjyYki5bB_9YUQZl3ccBwA5fpnDEjn7k",
  authDomain: "mocktankai.firebaseapp.com",
  projectId: "mocktankai",
  storageBucket: "mocktankai.firebasestorage.app",
  messagingSenderId: "356574520170",
  appId: "1:356574520170:web:a9396cc2f8a951e904fb13",
  measurementId: "G-6SXZK6T9G8"
};

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()