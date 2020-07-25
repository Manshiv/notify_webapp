import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import netflix_logo from '../images/netflix_logo.png'
import prime_logo from '../images/prime_logo.png'


const useStyles = theme => ({
    root: {
        margin:"10px",
        maxWidth: 345,
      },
  });


class NotificationCard extends Component{

  constructor(props){
    super(props)
  }
    
  render(){
    const { classes } = this.props;
    const logos= {'Amazon': prime_logo, 'Netflix': netflix_logo}
    var logo = logos[this.props.title]
    return(
      <div>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image={logo}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.title}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Set Consents
              </Button>
            </CardActions>
          </Card>
      </div>
    )
  }
}
Card.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(NotificationCard);

