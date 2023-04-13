import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9oQ2k8BTEF3cuKU7OdRdAHdnHiQFPq7U",
  authDomain: "garden-designer-9596e.firebaseapp.com",
  projectId: "garden-designer-9596e",
  storageBucket: "garden-designer-9596e.appspot.com",
  messagingSenderId: "847066230854",
  appId: "1:847066230854:web:aa58ce2a8699303dbe5a47",
  measurementId: "G-QY9KS1EZW8",
};

// Initialize Firebase

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
