import { initializeApp } from "firebase/app"; 
const firebaseConfig = { 
  apiKey: "AIzaSyANzzbK7BxkIdfCyeGY57fN-ov1rYawJGY", 
  authDomain: "checkali.firebaseapp.com", 
  projectId: "checkali", 
  storageBucket: "checkali.appspot.com", 
  messagingSenderId: "342900962105", 
  appId: "1:342900962105:web:05ccd09499dc08b784aee8", 
  measurementId: "G-ERW789JYY2" 
}; 
 
// Initialize Firebase 
export const app = initializeApp(firebaseConfig);