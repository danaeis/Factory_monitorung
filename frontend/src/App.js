import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect, }
from 'react-router-dom';
import React, { useState, useEffect } from "react"
import LoginForm from './components/login/LoginForm'
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      
        <Router>
          <Switch>
            <Route component={LoginForm} path="/" exact />
            <Route component={LoginForm} path="/login" exact />
            <Route component={Dashboard} path="/dashboard" exact />

          </Switch>
        </Router>
       
    </div>
  );
}

export default App;
