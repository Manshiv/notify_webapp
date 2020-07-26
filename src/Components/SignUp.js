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
        this.handleClick = this.handleClick.bind(this);
        this.create_consents = this.create_consents.bind(this);       
      }

    create_consents(email, user_id){
      console.log('creating consents')
      var notifs = ['Netflix', 'Prime Video'];
      var notifications_url = "https://notifynow-api.herokuapp.com/api/notifications/"
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token');
      // console.log(localStorage.getItem('Token'))
      // console.log('Calling '+notifications_url)
      // axios.get(notifications_url)
      // .then(function (response) {
      //   console.log(response.data)
      //   console.log('Notif res ' + response.data)
      //     if(response.status == 200){
      //     response.data.forEach(el => {
      //       notifs.push(el.notification_type)
      //     });
      // }
      //   })
      //   .catch(function (error) {
      //     console.log('Error in notifications')
      //     console.log(error);
      //   });
      
      var consents_url = "https://notifynow-api.herokuapp.com/api/consents/"
      console.log('Consent '+consents_url)
      console.log(notifs)
      for (var index=0; index < notifs.length; index++){
        var payload = {
          'user':user_id,
          'whatsapp':true,
          'chrome_ext':true,
          'notification_type': notifs[index]
        }
        console.log(payload)
        axios.post(consents_url, payload)
        .then(function (response) {
          console.log(response.data)
            if(response.status == 200){
              console.log(response.data)
        }
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    }
    

    handleClick(event){
        const that=this;
        var user_id = null
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/users/create/";
        event.preventDefault();
        var payload = {
            'name': this.state.name,
            'phone_number': this.state.phone_number,
            'email': this.state.email,
            'password': this.state.password
        }
        axios.post(apiBaseUrl,payload)
       .then(function (response) {
         if(response.status == 201){
           user_id = response.data.id;
           var input = {'email': payload.email, 'password': payload.password}
           var token_url = "https://notifynow-api.herokuapp.com/api/users/token/";
           axios.post(token_url,input)
          .then(function (response) {
             if(response.status == 200){
              var token = 'token '+response.data.token;
              localStorage.setItem('Token', token);
              that.create_consents(payload.email, user_id);
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
