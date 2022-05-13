import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDV-82u2_OlTVHkYdgG0Ih78C85qlO3d0g",
  authDomain: "copybot-xyz.firebaseapp.com",
  projectId: "copybot-xyz",
  storageBucket: "copybot-xyz.appspot.com",
  messagingSenderId: "75466188998",
  appId: "1:75466188998:web:74d9fe0bd6d14ed08c4fc7",
});

const auth = getAuth(firebaseApp);

const app = initializeApp(firebaseConfig);

//Detect auth state
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in!");
  } else {
    console.log("no user");
  }
});
