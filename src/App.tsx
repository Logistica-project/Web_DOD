import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './page/login/index';
import "./App.css"
import Formulario from './page/client/Index';
import Dashboard from './page/admin';
import PackagePedir from './page/orderPacks';

const App = () => {
  return (
    <Routes>
      <Route path="/"  Component={Login} />
      <Route path="/client"  Component={Formulario} />
      <Route path="/dashboard"  Component={Dashboard} />
      <Route path="/pack"  Component={PackagePedir} />
    </Routes>    
  );
};

export default App;
