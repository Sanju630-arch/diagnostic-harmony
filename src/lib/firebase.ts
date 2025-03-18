
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABpvr8tl_SLcXFKM8H2YBmwLVnYhxJjvM",
  authDomain: "diagnohub-auth.firebaseapp.com",
  projectId: "diagnohub-auth",
  storageBucket: "diagnohub-auth.appspot.com",
  messagingSenderId: "548193425713",
  appId: "1:548193425713:web:c9e75cf5213f825613c43a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
