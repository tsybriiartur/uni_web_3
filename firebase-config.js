// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://film-surfer-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
