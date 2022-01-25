import firebase from 'firebase';
import "firebase/storage"
// import storage from '@react-native-firebase/storage';
// import database from "@react-native-firebase/database"
// import '@firebase/auth';
// import '@firebase/firestore';

// var firebaseConfig = {
//           apiKey: "AIzaSyDtifQbLdReFHhJIxNvObOtpHtlpujdhK8",
//           authDomain: "my-project-1-5f5ff.firebaseapp.com",
//           databaseURL: "https://my-project-1-5f5ff.firebaseio.com",
//           projectId: "my-project-1-5f5ff",
//           storageBucket: "my-project-1-5f5ff.appspot.com",
//           messagingSenderId: "59396975914",
//           appId: "1:59396975914:web:3f00ee9505db28fb81c253"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDtifQbLdReFHhJIxNvObOtpHtlpujdhK8",
  authDomain: "my-project-1-5f5ff.firebaseapp.com",
  databaseURL: "https://my-project-1-5f5ff.firebaseio.com",
  projectId: "my-project-1-5f5ff",
  storageBucket: "my-project-1-5f5ff.appspot.com",
  messagingSenderId: "59396975914",
  appId: "1:59396975914:web:b997603550bd7d1f81c253"
};
        
firebase.initializeApp(firebaseConfig);
        // Initialize Firebase
var storage = firebase.storage();

export default storage