
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwx_fwY1GzQsI1FeKG6JDfKavD4AY5GmU",
  authDomain: "mawa-diagnostic-center.firebaseapp.com",
  projectId: "mawa-diagnostic-center",
  storageBucket: "mawa-diagnostic-center.appspot.com",
  messagingSenderId: "548193425713",
  appId: "1:548193425713:web:c9e75cf5213f825613c43a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
