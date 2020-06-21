import React from 'react';
import './App.css';
import Login from './Components/Login'
import Register from './Components/Register'
import GmailForwarder from './Components/GmailForwarder'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/login' exact component={Login}/>
          <Route path='/register' exact component={Register} />
          <Route path='/forwarder' exact component={GmailForwarder} />
        </Switch>
      </Router>
    </div>
      
    
  );
}

export default App;
