// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_N_Il2gNEDQSTGicaITC-BI_3bHp6UbQ",
    authDomain: "fellas-clothing-co.firebaseapp.com",
    projectId: "fellas-clothing-co",
    storageBucket: "fellas-clothing-co.appspot.com",
    messagingSenderId: "468735824024",
    appId: "1:468735824024:web:5bf86608ad70a7720f40ed",
    measurementId: "G-6B71DC2BVE"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// export default firebaseConfig;

export {app, auth};