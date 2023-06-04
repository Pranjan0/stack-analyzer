import {initializeApp} from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsmaojPIp8us1Ew78QUdDfc8WVXFyvsFs",
  authDomain: "stack-analyzer.firebaseapp.com",
  projectId: "stack-analyzer",
  storageBucket: "stack-analyzer.appspot.com",
  messagingSenderId: "944681055687",
  appId: "1:944681055687:web:a02d27eb608bcfd9b615e2",
  measurementId: "G-N6KDPC7LG4"
};

initializeApp(firebaseConfig);

const db = getFirestore();
export default db;