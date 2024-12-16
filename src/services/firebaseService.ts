import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBoeAS5aMfnSgg1ewwQtQ1xM4J2DOPn-eg",
  authDomain: "jobhunt-97ac8.firebaseapp.com",
  projectId: "jobhunt-97ac8",
  storageBucket: "jobhunt-97ac8.appspot.com",
  messagingSenderId: "643710760181",
  appId: "1:643710760181:web:9dcc6dcdbe97e72bd041bc",
  measurementId: "G-Q09RV7NEGM",
};

const app = initializeApp(firebaseConfig);
// Export Firebase Storage instance
export const storage = getStorage(app);

export const messaging = getMessaging(app);