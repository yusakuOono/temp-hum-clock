import firebase from "firebase/app";
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "********",
    authDomain: "********",
    projectId: "********",
    storageBucket: "********",
    messagingSenderId: "********",
    appId: "********",
    measurementId: "********"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
export {
  firebase,
  db
}