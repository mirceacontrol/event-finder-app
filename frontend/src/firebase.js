import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmWCBnzW0C5lBmoHifaK3BY87lJAJUNjs",
  authDomain: "event-finder-app-aaeb1.firebaseapp.com",
  projectId: "event-finder-app-aaeb1",
  storageBucket: "event-finder-app-aaeb1.firebasestorage.app",
  messagingSenderId: "30019731865",
  appId: "1:30019731865:web:442d4a55c2564fb56e9308"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
