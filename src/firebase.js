// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDzRT7Lye0G1jeDpU6a01Nz82KLL0U88Gk",
  authDomain: "instagram-clone-b823f.firebaseapp.com",
  projectId: "instagram-clone-b823f",
  storageBucket: "instagram-clone-b823f.appspot.com",
  messagingSenderId: "715419480777",
  appId: "1:715419480777:web:68cf046ba8437b9b001318",
  measurementId: "G-CEHS01N5M6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default db;
