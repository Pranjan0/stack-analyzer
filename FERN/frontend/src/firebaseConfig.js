import {initializeApp} from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv6upASkXMkRpKkeEgax6AXzBGZ4Ithh4",
  authDomain: "adminsplasher.firebaseapp.com",
  projectId: "adminsplasher",
  storageBucket: "adminsplasher.appspot.com",
  messagingSenderId: "501883015624",
  appId: "1:501883015624:web:f89f83f252cb789bb3b0fd",
  measurementId: "G-QXQX1RY85W"
};

initializeApp(firebaseConfig);

const db = getFirestore();
export default db;