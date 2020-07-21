import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";



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
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  });

  class SignUp extends Component{

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
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/users/create/";
        event.preventDefault();
        console.log(this.state);
        var payload = {
            'name': this.state.name,
            'phone_number': this.state.phone_number,
            'email': this.state.email,
            'password': this.state.password
        }

        axios.post(apiBaseUrl,payload)
       .then(function (response) {
         if(response.status == 201){
           console.log('calling token')
           var input = {'email': payload.email, 'password': payload.password}
           var token_url = "https://notifynow-api.herokuapp.com/api/users/token/";
           console.log(input)
           axios.post(token_url,input)
          .then(function (response) {
             if(response.status == 200){
              var token = 'token '+response.data.token;
              localStorage.setItem('Token', token);
              console.log(localStorage.getItem('Token'));
              window.location.reload(); 
          }
        })
        .catch(function (error) {
          console.log(error);
        });
         }
       })
       .catch(function (error) {
         console.log(error);
       });
      }

      onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }

    render(){
        if (localStorage.getItem('Token')){
          return <Redirect to='/notifications'/>
        }
        const { classes } = this.props;
        const  { name, phone_number, email, password } = this.state;
        return (
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <form onSubmit={(event) => this.handleClick(event)} className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        value={name}
                        id="fullName"
                        label="Full Name"
                        autoFocus
                        onChange={this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        autoComplete="email"
                        onChange={this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={this.onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="phone_number"
                        label="WhatsApp Number"
                        type="tel"
                        id="phoneNumber"
                        value={phone_number}
                        onChange={this.onChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          );
    }
  }

  SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(SignUp);
