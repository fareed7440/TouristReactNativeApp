import firebase from 'firebase' 

var config = {
    apiKey: "AIzaSyDmEyR-j2wfBDLIOa8NDBSe8XJ9YohxrlM",
    authDomain: "touristapp-fdb87.firebaseapp.com",
    databaseURL: "https://touristapp-fdb87.firebaseio.com",
    projectId: "touristapp-fdb87",
    storageBucket: "",
    messagingSenderId: "946512964399"
  };
  firebase.initializeApp(config);

  export const auth  = firebase.auth();
  export const database = firebase.database();