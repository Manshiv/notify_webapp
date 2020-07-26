import React, {Component} from 'react'
import Switch from '@material-ui/core/Switch';
import CommonAppBar from './CommonAppBar'
import axios from 'axios';

class Consents extends Component{

    constructor(props){
        super(props)
        this.state = {
            whatsapp:true,
            chrome_ext:true,
            id:null,
            notification_type:null
        }
        this.handleClick = this.handleClick.bind(this)
        this.make_change = this.make_change.bind(this)
    }

    make_change(){
        var apiBaseUrl = `https://notifynow-api.herokuapp.com/api/consents/${this.state.id}/`;
        console.log(localStorage.getItem('Token'))
        console.log(this.state)
        console.log(apiBaseUrl)
        var payload = {'chrome_ext':true}
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Token');
        //var headers = {'Authorization': localStorage.getItem('Token')}
        axios.patch(apiBaseUrl, this.state)
        .then(function (response) {
        if(response.status == 200){ 
            console.log(response)
        }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    handleClick(event){
        event.preventDefault();
        this.setState({[event.target.name]: event.target.checked }, this.make_change);
    }

    componentDidMount(){
        const that = this;
        const notification_id = this.props.location.state.id
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/consents/";
        var headers = {'Authorization': localStorage.getItem('Token')}
        axios.get(apiBaseUrl,headers=headers)
        .then(function (response) {
        if(response.status == 200){ 
            console.log('Consents data')    
            console.log(localStorage.getItem('Token'))
            console.log('consents response ' +response.data)
            var consent_data = response.data.find(item =>  item.notification_type == notification_id)
            that.setState({'whatsapp':consent_data.whatsapp, 'chrome_ext': consent_data.chrome_ext, 'id':consent_data.id, 'notification_type':consent_data.notification_type})
        }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    
    render(){
        return (
            
            <div>
                <CommonAppBar title='Consents' />
                <table >
                  <tr>
                      <td>
                          <div>WhatsApp Notification  </div>
                      </td>
                      <td>
                          <Switch
                          checked={this.state.whatsapp}
                          onChange={(event) => this.handleClick(event)}
                          name="whatsapp"
                          color='primary'
                          />
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <div>Google Chrome Extension  </div>
                      </td>
                      <td>
                          <Switch
                          checked={this.state.chrome_ext}
                          onChange={(event) => this.handleClick(event)}
                          name="chrome_ext"
                          color='primary'
                          />
                      </td>
                  </tr>
                </table>
            </div>   
        );
    }
}

export default Consents