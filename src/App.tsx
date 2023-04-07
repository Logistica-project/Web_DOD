import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './page/login/index';
import "./App.css"
import Formulario from './page/client/Index';
import Dashboard from './page/admin';
import PackagePedir from './page/orderPacks';

//   function App() {

// //    const db = getFirestore();
// //   async function writeUserData() {

// //     const querySnapshot = await getDocs(collection(db, "paquetes"));
// //     querySnapshot.forEach((doc: { id: any; data: () => any; }) => {
// //     console.log(`${doc.id} =>`,doc.data());
// // });
// //  }

// //   useEffect(()=>{

// // const unsub = onSnapshot(doc(db, "paquetes", "RiHft3vVvNy1togobXp5"), (doc) => {
// //   const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
// //   console.log(source, " data: ", doc.data());
// // })
// // ;
// //   },[])




//   return (
//     <div></div>
//   )
// }

const App = () => {
  return (
    <Routes>
      <Route path="/login"  Component={Login} />
      <Route path="/client"  Component={Formulario} />
      <Route path="/dashboard"  Component={Dashboard} />
      <Route path="/pack"  Component={PackagePedir} />
    </Routes>    
  );
};

export default App;
