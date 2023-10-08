import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAi77l16CvIIIwNZ3WL2GBWyAxu9dP5XqA",
  authDomain: "student-app-72c85.firebaseapp.com",
  projectId: "student-app-72c85",
  storageBucket: "student-app-72c85.appspot.com",
  messagingSenderId: "787044075208",
  appId: "1:787044075208:web:fc234dd276c163997707fd",
  measurementId: "G-RS63WCV9CG"
};




const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);