import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu'
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';



const theme = createMuiTheme({
  palette: {
    primary: { main: '#121212' },
  },
});


const useStyles = theme => ({
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
  rightButton: {
    marginLeft: '10px',
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
  }

  handleClick(event){
    const id = event.target.id
    console.log(event);
    localStorage.clear();
    console.log(localStorage.getItem('Token'))
    window.location.reload()
  }
  
  render() { 
      
    const { classes } = this.props;
    let button;
    if (this.state.isLoggedIn){
      button = <Button id='logout' color='inherit' onClick={(event) => this.handleClick(event)}>Logout</Button>
    }
    else{
      button = <Button id='login' color='inherit' onClick={(event) => this.handleClick(event)}>Login - Sign up</Button>
    }
    if (localStorage.getItem('Token') == null){
        return <Redirect to='/signin' />
    }
    return (
       <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {this.props.title}
            </Typography>
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


// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function CommonAppBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             test
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
