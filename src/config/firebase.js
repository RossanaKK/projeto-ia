import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaeB-xdSYWqQ2nQBgX52F_aGhag3_tYig",
  authDomain: "projeto-ia-49fa3.firebaseapp.com",
  projectId: "projeto-ia-49fa3",
  storageBucket: "projeto-ia-49fa3.firebasestorage.app",
  messagingSenderId: "695550982926",
  appId: "1:695550982926:web:9b75da4f5f88652f90355f",
  measurementId: "G-0DG7Z2YP22"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)

export const auth = getAuth(app);
export default app;