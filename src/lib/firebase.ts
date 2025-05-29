import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyAyPAdfLSCl-U4GRcshF90-RtsaHYf5qsU",
  authDomain: "mindful-ai-wellbeing-hub.firebaseapp.com",
  projectId: "mindful-ai-wellbeing-hub",
  storageBucket: "mindful-ai-wellbeing-hub.appspot.com",
  messagingSenderId: "524967078134",
  appId: "1:524967078134:web:cf3861ef1a11db5fdf64d7",
  measurementId: "G-06EF8BMWN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // ✅ INITIALIZE FIRESTORE

export { app, analytics, auth, provider, db }; // ✅ EXPORT db
