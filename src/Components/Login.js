import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import UploadScreen from 'react-bootstrap'



class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password:''
        }

    }

    handleClick(event){
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/users/token/";
        axios.post(apiBaseUrl, this.state)
        .then(function (response) {
        if(response.status == 200){
        var token = 'token '+response.data.token;
        localStorage.setItem('Token', token);
        console.log(localStorage.getItem('Token'))
        }
        else if(response.status == 204){
        console.log("email password do not match");
        alert("email password do not match")
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
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your email"
             floatingLabelText="email"
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