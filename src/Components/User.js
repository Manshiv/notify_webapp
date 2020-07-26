import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {green} from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment'
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CommonAppBar from './CommonAppBar'



const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      green: {
        color: '#fff',
        backgroundColor: green[500],
      },
      form: {
        width: '100%',
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  });

  class User extends Component{

    constructor(props){
        super(props);
        this.state={
          name:'',
          phone_number:'',
          email:'',
          id:''
        }
      } 

    handleClick(event){
        var id = this.state.id
        var apiBaseUrl = `https://notifynow-api.herokuapp.com/api/users/${id}/`;
        event.preventDefault();
        console.log(this.state);
        var payload = {
            'name': this.state.name,
            'phone_number': this.state.phone_number,
            'email': this.state.email,
        }
        console.log(apiBaseUrl)
        axios.patch(apiBaseUrl,payload)
       .then(function (response) {
         if(response.status == 200){
           alert('Changes have been saved');
         }
       })
       .catch(function (error) {
         console.log(error);
       });
      }

    onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount(){
        const that = this;
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/users/1/";
        console.log(localStorage.getItem('Token'))
        var headers = {'Authorization': localStorage.getItem('Token')}
        axios.get(apiBaseUrl,headers=headers)
        .then(function (response) {
        if(response.status == 200){   
            // Fix this once vayu fix the issue  
            var data = response.data
            console.log(data)
            that.setState({'name': data.name, 'email':data.email, 'phone_number':data.phone_number, 'id':data.id})
          
        }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render(){
        const { classes } = this.props;
        const  { name, phone_number, email, password } = this.state;
        return (
            <div>
                <CommonAppBar title='Settings'/>
                <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                <Avatar className={classes.green}>
                    <AssignmentIcon />
                    </Avatar>
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
                    className={classes.submit}>
                        Submit
                    </Button>
                    </form>
                </div>
                </Container>
            </div>
          );
    }
  }

  User.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles)(User);
