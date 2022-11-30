// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG_y75XhBiOZUnqnPL1AQ6E6U7EqjQIjI",
  authDomain: "thriftr-1e99d.firebaseapp.com",
  projectId: "thriftr-1e99d",
  storageBucket: "thriftr-1e99d.appspot.com",
  messagingSenderId: "281048744585",
  appId: "1:281048744585:web:53c41a16ee2d8577697c58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };