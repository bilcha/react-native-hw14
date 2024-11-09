import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrdpxmCnzvNkqCjyGZXxMjv-lJGQ8-oIs",
  authDomain: "react-native-88a4d.firebaseapp.com",
  databaseURL:
    "https://react-native-88a4d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-88a4d",
  storageBucket: "gs://react-native-88a4d.appspot.com",
  messagingSenderId: "523611749906",
  appId: "1:523611749906:web:a90d0da7c6b1ae92e89834",
  measurementId: "G-Z5W3H7KFLE",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
