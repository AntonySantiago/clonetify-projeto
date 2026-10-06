import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyAB51Zca0IskXabJaXOTTg90_kPpwhJTJI",
  authDomain: "clonetify-fa926.firebaseapp.com",
  databaseURL: "https://clonetify-fa926-default-rtdb.firebaseio.com",
  projectId: "clonetify-fa926",
  storageBucket: "clonetify-fa926.firebasestorage.app",
  messagingSenderId: "206884604154",
  appId: "1:206884604154:web:56d3ea8a34bacc767ce143",
  measurementId: "G-PJBSWFXQYS"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
export { db, storage };