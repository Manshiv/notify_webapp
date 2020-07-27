import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import Dropdown from './Dropdown'


const useStyles = theme =>  ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
        flexGrow: 1,  
        alignText: 'center'
      },
});

class CommonAppBar extends Component{

  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    if (localStorage.getItem('Token')){
      this.state={isLoggedIn:true}
    }
    else{
      this.state={isLoggedIn:false}
    }
    console.log(this.state)
  }

  handleClick(event){
        localStorage.clear();
        window.location.reload()
      }

  render(){
  const {classes} =this.props;
  let button;
  if (this.state.isLoggedIn){
    button = <Button id='logout' color='inherit' onClick={(event) => this.handleClick(event)} style={{marginLeft: "auto",}}>Logout</Button>
  }
  else{
    button = <Button id='login' color='inherit' onClick={(event) => this.handleClick(event)} style={{marginLeft: "auto",}}>Login - Sign up</Button>
      }
  if (localStorage.getItem('Token') == null){
            return <Redirect to='/signin' />
        }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Dropdown title={this.props.title}/>
          </IconButton>
          {button}
        </Toolbar>
      </AppBar>
    </div>
  );
  }
}
CommonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(useStyles)(CommonAppBar);
