import firebase from "firebase/app";
import "firebase/firestore";

export const addFirestore = (id) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDc-CZb-Q4X4dvI3YgykDFsJO6EDvlssxo",
    authDomain: "try-poke.firebaseapp.com",
    projectId: "try-poke",
    storageBucket: "try-poke.appspot.com",
    messagingSenderId: "441617952571",
    appId: "1:441617952571:web:b6aca1bb528c7eeba4d11e",
    measurementId: "G-7Y322KD43Q",
  };
  if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
  console.log(firebase.apps);
  const db = firebase.firestore();
  const collection = db.collection("message");
  collection
    .add({ message: id })
    .then((doc) => console.log(`${doc.id}success`))
    .catch((e) => console.log(e));
};
