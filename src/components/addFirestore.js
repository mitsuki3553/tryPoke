import firebase from "firebase/app";
import "firebase/firestore";

export const addFirestore = (id) => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
  };
  if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const collection = db.collection("pokemonId");
  collection
    .add({ pokemonId: id })
    .then((doc) => console.log(`${doc.id}success`))
    .catch((error) => console.log(error));
};
export const getFirestore = async (setPrevPoke) => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
  };
  if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const collection = db.collection("pokemonId");

  collection.get().then((snapshot) => {
    let arr = [];
    snapshot.forEach((doc) => {
      const a = doc.data().pokemonId;
      arr = [...arr, a];
    });

    setPrevPoke(arr);
  });
};
