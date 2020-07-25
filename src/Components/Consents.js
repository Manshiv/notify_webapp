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
        }
        this.handleClick = this.handleClick.bind(this)
        this.make_change = this.make_change.bind(this)
    }

    make_change(){
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/consents/";
        console.log(localStorage.getItem('Token'))
        var headers = {'Authorization': localStorage.getItem('Token')}
        axios.post(apiBaseUrl,headers=headers, this.state)
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
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/consents/";
        console.log(localStorage.getItem('Token'))
        var headers = {'Authorization': localStorage.getItem('Token')}
        axios.get(apiBaseUrl,headers=headers)
        .then(function (response) {
        if(response.status == 200){ 
            console.log(response.data)
            that.setState({'whatsapp':response.data[0].whatsapp, 'chrome_ext': response.data[0].chrome_ext})
        }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    
    render(){
        return (
            <div>
                <CommonAppBar title='Notifications' />
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