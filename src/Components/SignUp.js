import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
          password:'', 
          user_id:null, 
        }
        this.handleClick = this.handleClick.bind(this);
        this.create_token = this.create_token.bind(this);   
      }
    
    async create_token(email, password){
      console.log('Creating token ')
      var token_url = "https://notifynow-api.herokuapp.com/api/users/token/";
      var input = {'email': email, 'password': password}
      await axios.post(token_url,input)
          .then(function (response) {
            console.log(response)
             if(response.status == 200){
              var token = 'token '+response.data.token;
              console.log(token)
              localStorage.setItem('Token', token);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    async handleClick(event){
      const that = this;
      var user_id = null;
      var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/users/create/";
      event.preventDefault();
      var payload = {
          'name': this.state.name,
          'phone_number': this.state.phone_number,
          'email': this.state.email,
          'password': this.state.password
      }
      await axios.post(apiBaseUrl,payload)
      .then(function (response) {
        console.log(response.data)
        if(response.status == 201){
          user_id = response.data.id;
          localStorage.setItem('User Id', user_id);
          console.log('Creating token ')
          var token_url = "https://notifynow-api.herokuapp.com/api/users/token/";
          var input = {'email': payload.email, 'password': payload.password}
          axios.post(token_url,input)
              .then(function (response) {
                console.log(response)
                  if(response.status == 200){
                  var token = 'token '+response.data.token;
                  console.log(token)
                  localStorage.setItem('Token', token);
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
          console.log('Sign up - '+this.state.user_id)
          return <Redirect to='/forwarder'/>
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
                        type="email"
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
                  
                  <AwesomeButton
                    type="primary"
                    ripple
                    size='large'
                    className={classes.submit}
                  >
                    Sign up
                  </AwesomeButton>
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
