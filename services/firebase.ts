import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_yCXtt0PknGbdKHJbmcRO73JUJ1S6Utc",
  authDomain: "lunaflow-lembretes.firebaseapp.com",
  projectId: "lunaflow-lembretes",
  storageBucket: "lunaflow-lembretes.firebasestorage.app",
  messagingSenderId: "762095502167",
  appId: "1:762095502167:web:0048c550aef986e73cf412",
  measurementId: "G-0T4T1W57P4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
