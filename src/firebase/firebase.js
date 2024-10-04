// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCNvc5ZmAq1QcVkE6LfoEDwsxai5Y4shHg",
    authDomain: "recipefinderai-1c949.firebaseapp.com",
    projectId: "recipefinderai-1c949",
    storageBucket: "recipefinderai-1c949.appspot.com",
    messagingSenderId: "677463343270",
    appId: "1:677463343270:web:33852f3c3dcb7cbcf07467",
    measurementId: "G-X00P3Y9SP5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};