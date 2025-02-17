// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "tales-spinner.firebaseapp.com",
  projectId: "tales-spinner",
  storageBucket: "tales-spinner.appspot.com",
  messagingSenderId: "758538014743",
  appId: "1:758538014743:web:7ea67a64b84c0aed668c52",
  measurementId: "G-SPPW6MP6H0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);