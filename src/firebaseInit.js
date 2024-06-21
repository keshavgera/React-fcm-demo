import firebase from "firebase/app";
import "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "FROM FIREBASE CONSOLE",
  // authDomain: "FROM FIREBASE CONSOLE",
  databaseURL: "FROM FIREBASE CONSOLE",
  // projectId: "FROM FIREBASE CONSOLE",
  // storageBucket: "FROM FIREBASE CONSOLE",
  // messagingSenderId: "FROM FIREBASE CONSOLE",
  // appId: "FROM FIREBASE CONSOLE",
  // measurementId: "FROM FIREBASE CONSOLE",

  apiKey: "AIzaSyBlj6oTsYeXhwuQ7-EWr7PwltwbsEZXmhw",
  authDomain: "webdemo-9cc41.firebaseapp.com",
  projectId: "webdemo-9cc41",
  storageBucket: "webdemo-9cc41.appspot.com",
  messagingSenderId: "363208016722",
  appId: "1:363208016722:web:60a04419e682a51929b08b",
  measurementId: "G-4S93D8918R"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });