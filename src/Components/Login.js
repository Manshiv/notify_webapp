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
            username:'',
            password:''
        }

    }

    handleClick(event){
        const proxy = "https://cors-anywhere.herokuapp.com/"
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/admin/login/";
        
        
        var csrftoken = '';
        axios.get(proxy + apiBaseUrl, this.state)
        .then(function (response) {
          console.log('Check response')
          console.log(response);
          console.log(response.status)
          
        if(response.status == 200){
        console.log('Inside 200')
        csrftoken = response.cookies['csrftoken'];
        console.log(response)
        console.log(csrftoken);
        
        }
        else if(response.data.code == 204){
        console.log("Username password do not match");
        alert("username password do not match")
        }
        else{
        console.log("Username does not exists");
        alert("Username does not exist");
        }
        })
        .catch(function (error) {
        console.log(error);
        });

        axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
        

        axios.post(proxy + apiBaseUrl, this.state)
        .then(function (response) {
        console.log(response);
        if(response.data.code == 200){
        console.log("Login successfull");
        
        }
        else if(response.data.code == 204){
        console.log("Username password do not match");
        alert("username password do not match")
        }
        else{
        console.log("Username does not exists");
        alert("Username does not exist");
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
             hintText="Enter your username"
             floatingLabelText="username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
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