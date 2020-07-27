import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import { white } from 'material-ui/styles/colors';

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{color : white }}>
        {props.title}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to='/user'>
          <MenuItem  onClick={handleClose}>My account</MenuItem>
        </Link>
        <Link to='/forwarder'>
          <MenuItem onClick={handleClose}>Forwarder</MenuItem>
        </Link>
        <Link to='/notifications'>
          <MenuItem onClick={handleClose}>Notifications</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}