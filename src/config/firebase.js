import firebase from 'firebase/compat/app';
import {getStorage} from  "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDtifQbLdReFHhJIxNvObOtpHtlpujdhK8",
  authDomain: "my-project-1-5f5ff.firebaseapp.com",
  databaseURL: "https://my-project-1-5f5ff.firebaseio.com",
  projectId: "my-project-1-5f5ff",
  storageBucket: "my-project-1-5f5ff.appspot.com",
  messagingSenderId: "59396975914",
  appId: "1:59396975914:web:b997603550bd7d1f81c253"
};
        
const app = firebase.initializeApp(firebaseConfig);


var storage = getStorage(app)

export default storage