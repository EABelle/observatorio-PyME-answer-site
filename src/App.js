import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./views/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route path="/login">
                  <Login />
              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
