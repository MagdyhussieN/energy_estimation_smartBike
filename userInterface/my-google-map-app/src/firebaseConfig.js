// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBNPVkLVAZRv3hE_4HFklDyrwR9ctsAyU",
    authDomain: "smartbike-ab002.firebaseapp.com",
    databaseURL: "https://smartbike-ab002-default-rtdb.firebaseio.com",
    projectId: "smartbike-ab002",
    storageBucket: "smartbike-ab002.appspot.com",
    messagingSenderId: "296133854740",
    appId: "1:296133854740:web:c994dcf19f24d865070901",
    measurementId: "G-JS6DT0989H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
