import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CommonAppBar from './CommonAppBar';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss'

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', 
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  });


class SignIn extends Component{

    constructor(props){
        super(props);
        this.state={
          email:'',
          password:''
        }
      }

      onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }

      handleClick(event){
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/users/token/";
        event.preventDefault();
        console.log(this.state);
        var payload = {
            'email': this.state.email,
            'password': this.state.password
          }
          axios.post(apiBaseUrl, payload)
        .then(function (response) {
        if(response.status == 200){
          var token = 'token '+response.data.token;
          localStorage.setItem('Token', token);
          window.location.reload(); 
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
        if (localStorage.getItem('Token')){
            return <Redirect to='/notifications'/>
          }
        const { classes } = this.props;
        const  { email, password } = this.state;
        return (
          <div>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <form onSubmit={(event) => this.handleClick(event)} className={classes.form} noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={this.onChange}
                      autoFocus
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={password}
                      onChange={this.onChange}
                      autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    
                    <AwesomeButton
                    type="primary"
                    ripple
                    size='large'
                    className={classes.submit}
                  >
                    Sign in
                  </AwesomeButton>
                    <Grid container>
                      <Grid item>
                        <Link href="/signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Container>
            </div>
          );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(SignIn);