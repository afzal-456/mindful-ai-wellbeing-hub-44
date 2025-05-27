// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyPAdfLSCl-U4GRcshF90-RtsaHYf5qsU",
  authDomain: "mindful-ai-wellbeing-hub.firebaseapp.com",
  projectId: "mindful-ai-wellbeing-hub",
  storageBucket: "mindful-ai-wellbeing-hub.appspot.com", // FIXED TYPO: from .app to .appspot.com
  messagingSenderId: "524967078134",
  appId: "1:524967078134:web:cf3861ef1a11db5fdf64d7",
  measurementId: "G-06EF8BMWN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Add these for auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, analytics, auth, provider };
