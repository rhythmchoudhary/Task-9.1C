import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCUo5sOXKkxsvmSgQP6rZG6jW2UyWwhSog",
  authDomain: "oct-5a0cc.firebaseapp.com",
  projectId: "oct-5a0cc",
  storageBucket: "oct-5a0cc.appspot.com",
  messagingSenderId: "689121574344",
  appId: "1:689121574344:web:6e255601539730bfacd4fd",
  measurementId: "G-69SLEJFE6R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db }; 
