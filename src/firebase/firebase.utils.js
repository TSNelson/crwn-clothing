// firebase project home: https://console.firebase.google.com/project/crwn-clothing-db-97dcb/overview

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCJtzfQpcZPX4WCP4nHVi91JSmVuYm4r5w",
  authDomain: "crwn-clothing-db-97dcb.firebaseapp.com",
  projectId: "crwn-clothing-db-97dcb",
  storageBucket: "crwn-clothing-db-97dcb.appspot.com",
  messagingSenderId: "746967963561",
  appId: "1:746967963561:web:a03cfb5f129ed0895496b8",
  measurementId: "G-VHG5QJGBGW"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, data) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName, email, createdAt, ...data
      })
    } catch(err) {
      console.log('error creating user', err.message);
    }
  }
  return userRef;
}

export default firebase;

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
//*/

/*
<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-analytics.js"></script>
//*/

/*
<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCJtzfQpcZPX4WCP4nHVi91JSmVuYm4r5w",
    authDomain: "crwn-clothing-db-97dcb.firebaseapp.com",
    projectId: "crwn-clothing-db-97dcb",
    storageBucket: "crwn-clothing-db-97dcb.appspot.com",
    messagingSenderId: "746967963561",
    appId: "1:746967963561:web:a03cfb5f129ed0895496b8",
    measurementId: "G-VHG5QJGBGW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
//*/