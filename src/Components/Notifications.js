import React, {Component} from 'react'
import CommonAppBar from './CommonAppBar'
import axios from 'axios';
import NotificationCard from './NotificationCard'
import Grid from '@material-ui/core/Grid';

class Notifications extends Component{

    constructor(props){
        super(props)
        this.state = {
            notifications:[]
        }
    }

    componentDidMount(){
        const that = this;
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/notifications/";
        console.log(localStorage.getItem('Token'))
        var headers = {'Authorization': localStorage.getItem('Token')}
        axios.get(apiBaseUrl,headers=headers)
        .then(function (response) {
        if(response.status == 200){ 
            console.log(response.data)
            that.setState({'notifications':response.data})
        }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    renderCards(){
        console.log(this.state.notifications)
        return this.state.notifications.map((item) =>(
            <Grid item xs={6}>
                <NotificationCard title={item.notification_type}/>
            </Grid>
          
        ));
      }

   
    render(){
        return(
            <div>
                <CommonAppBar title='Notifications' />
                <Grid container spacing={2}>
                    {this.renderCards()}
                </Grid>
                
            </div>
        )
    }
}

export default Notifications