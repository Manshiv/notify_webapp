import React from 'react';
import './App.css';
import GmailForwarder from './Components/GmailForwarder'
import Notifications from './Components/Notifications'
import SignIn from './Components/SignIn'
import Home from './Components/Home'
import SignUp from './Components/SignUp'
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/home' excat component={Home} />
          <Route path='/signin' exact component={SignIn}/>
          <Route path='/signup' exact component={SignUp} />
          <Route path='/forwarder' exact component={GmailForwarder} />
          <Route path='/notifications' exact component={Notifications} />
        </Switch>
      </Router>
    </div>
      
    
  );
}

export default App;
