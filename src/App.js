import React from 'react';
import './App.css';
import GmailForwarder from './Components/GmailForwarder';
import Consents from './Components/Consents';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import User from './Components/User';
import Notification from './Components/Notifications';
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/home' excat component={Home} />
          <Route path='/user' exact component={User} />
          <Route path='/signin' exact component={SignIn}/>
          <Route path='/signup' exact component={SignUp} />
          <Route path='/notifications' exact component={Notification} />
          <Route path='/consents' exact component={Consents} />
          <Route path='/forwarder' exact component={GmailForwarder} />
          
        </Switch>
      </Router>
    </div>
      
    
  );
}

export default App;
