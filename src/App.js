import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import { useAuth } from './store/FirebaseContext';
import { ProductProvider } from './store/FirebaseContext';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup';
import ViewPost from './Pages/ViewPost';
import CreatePage from './Pages/Create';


function App() {
  const user = useAuth();
  

  return (
    <div>
      <Router>
        
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/create">
            <CreatePage />
          </Route>
          <Route path="/view/:productId">
            <ViewPost />
          </Route>
       
      </Router>
    </div>
  );
}

export default App;
