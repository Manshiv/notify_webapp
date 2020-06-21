import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {Redirect, browserHistory} from 'react-router';
import CommonAppBar from './CommonAppBar';

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password:'',
        }

    }

    handleClick(event){
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/users/token/";
        var payload = {
          'email': this.state.email,
          'password': this.state.password
        }
        axios.post(apiBaseUrl, payload)
        .then(function (response) {
        if(response.status == 200){
          var token = 'token '+response.data.token;
          localStorage.setItem('Token', token);
          console.log(localStorage.getItem('Token'))
          browserHistory.push('/forwarder')
          
        }
        else if(response.status == 204){
          console.log("email password do not match");
          alert("email password do not match");
        }
        else{
          console.log("email does not exists");
          alert("email does not exist");
        }
        })
        .catch(function (error) {
          console.log(error);
        });
        }

    
    render(){
        return(
            <div>
              <CommonAppBar title='Login' />
              <MuiThemeProvider>
                <div>
                  <TextField
                    hintText="Enter your email"
                    floatingLabelText="Email"
                    onChange = {(event,newValue) => this.setState({email:newValue})}
                    />
                  <br/>
                  <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                  <br/>
                  <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </div>
                </MuiThemeProvider>
              </div>
        )
    }
}
const style = {
    margin: 15,
   };
export default Login