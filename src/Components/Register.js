import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login'
class Register extends Component {

  constructor(props){
    super(props);
    this.state={
      name:'',
      phone_number:'',
      email:'',
      password:''
    }
  }

  handleClick(event){
    const proxy = "https://cors-anywhere.herokuapp.com/"
    var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/users/create/";
    console.log("values",this.state.name,this.state.phone_number,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var headers= {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
   }
    
    axios.post(proxy + apiBaseUrl,this.state)
   .then(function (response) {
     console.log(response);
     if(response.data.code == 201){
       var loginscreen=[];
       loginscreen.push(<Login parentContext={this}/>);
       var loginmessage = "Not Registered yet.Go to registration";
       self.props.parentContext.setState({loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Register",
       isLogin:true
        });
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your Full Name"
             floatingLabelText="Full Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Phone Number"
             type='tel'
             floatingLabelText="Phone Number"
             onChange = {(event,newValue) => this.setState({phone_number:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;