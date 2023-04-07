import {initializeApp}  from "firebase/app";

function confingInitialize(){
  const firebaseConfig = {
    apiKey: "AIzaSyCDvsSFw-oYikq50G-JeFBu4GDFyx3ciUg",
    authDomain: "prueba-e5f4e.firebaseapp.com",
    databaseURL: "https://prueba-e5f4e-default-rtdb.firebaseio.com",
    projectId: "prueba-e5f4e",
    storageBucket: "prueba-e5f4e.appspot.com",
    messagingSenderId: "996655970189",
    appId: "1:996655970189:web:7785f763aa186baf532fc4"
  };
  
  initializeApp(firebaseConfig);
}


export default confingInitialize