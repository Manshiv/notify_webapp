import React, {Component} from 'react';
import { flexbox, compose } from '@material-ui/system';
import CommonAppBar from './CommonAppBar'
import { Button } from '@material-ui/core';
import axios from 'axios';
import Typography from 'material-ui/styles/typography';
import { AwesomeButtonProgress } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss'



class GmailForwarder extends Component{

    constructor(props){
        super(props)
        this.state = {
            'showcode': false, 
            'code':null
        }
        this.handleClick = this.handleClick.bind(this)
    }

    
    async handleClick(event){
        var apiBaseUrl = "https://notifynow-api.herokuapp.com/api/user_mails/";
        const for_email_add = "forwarding-noreply@google.com"
        //event.preventDefault();
        var headers = {'Authorization': localStorage.getItem('Token')}
        axios.get(apiBaseUrl,headers=headers)
        .then(function (response) {
        if(response.status == 200){
            var mails = response.data;
            var code_mails = [];
            for (var i=0; i<mails.length; i++){
                if (mails[i].mail_from == for_email_add){
                    code_mails.push(mails[i])
                }
            }
            var temp_mail = code_mails.reduce(function(prev, current) {
                if (+current.id > +prev.id) {
                    return current;
                } else {
                    return prev;
                }
            });
            
            var mail_with_code = JSON.parse((temp_mail.user_mail))
            var code = mail_with_code.subject.match(/\(([^)]+)\)/)[1].replace('#', '');
            if (code){
                window.alert('Your verification code ' +code)
            }
            
        }
        })
        .catch(function (error) {
        console.log(error);
        });
        }

    render(){
        const listItem = {
            textAlign: 'left',
        }
        const fig = {
            Display: flexbox,
            width:'800px',
            height:'350px',
        }
        const show = this.showcode
        const code = this.code
        return(
            
            <div>
                <CommonAppBar title='Forwarder' /> 
                <ol>
                    <li >
                        <p style={listItem}>
                            Select the gear icon, then choose <strong>Settings</strong> from the drop-down menu.
                        </p>
                        <div style={listItem}>
                            <img src='https://www.lifewire.com/thmb/AmSJU-WWxNB3CtI8UNiWVYrX2aw=/1851x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/002-how-to-delete-with-a-swift-keyboard-shortcut-in-gmail-1172079-c5d28b8872d341b6894b933566647158.jpg' 
                            style={fig}
                            /> 
                        </div>    
                    </li>
                    <li>
                        <p style={listItem}>
                            Go to the <strong>Filters and Blocked Addresses</strong>  tab.
                        </p>
                        <div style={listItem}>
                            <img src='https://www.lifewire.com/thmb/Lrg2NJfBIwLBzVEw1ALTmDk6hLg=/1002x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/001-how-to-save-export-and-back-up-gmail-filters-1172109-14f4a66bfb904b71b5e62089bda4ee05.jpg' 
                            style={fig}
                            /> 
                        </div>
                    </li>
                    <li>
                        <p style={listItem}>
                            Select <strong>Create a new filter.</strong>
                        </p>
                        <div style={listItem}>
                            <img src='https://www.lifewire.com/thmb/M3UVK2AMRSWYS3qwOdGvdX0T1VU=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/001-how-to-forward-gmail-email-using-filters-1171934-6fc67410836945e6ba6d0cf844b84ad4.jpg' 
                            style={fig}
                            />
                        </div>
                    </li>
                    <li>
                        <p style={listItem}>
                        Enter the email you want to forward. Then in the subject field enter Netflix. 
                        When you finish, select Create filter.
                        </p>
                        <div style={listItem}>
                        </div>
                    </li>
                    <li>
                        <p style={listItem}>
                        Select the <strong>Forward it to</strong> check box, choose the address to which you want these messages delivered 
                        from the drop-down list, then select <strong>Create filter</strong>. Email matching the criteria you set will be 
                        forwarded to this address.
                        </p>
                        <div style={listItem}>
                            <img src='https://www.lifewire.com/thmb/TdTn6UkSpwZ5ozY6VCiTUD8_TvI=/1908x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/003-how-to-forward-gmail-email-using-filters-1171934-5f27962fc5ad48bbbff900a9e093f6fa.jpg' 
                            style={fig}
                            />
                        </div>
                    </li>
                    <li>
                        <p style={listItem}>
                        If the desired email address isn't in the drop-down list, select <strong>add forwarding address</strong> and 
                        enter the address in the box that appears. Choose <strong>Next</strong>.
                        </p>
                        <div style={listItem}>
                            <img src='https://www.lifewire.com/thmb/qwih29MBptSWG2N1LOFVSWv3TWE=/1787x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/004-how-to-forward-gmail-email-using-filters-1171934-858d1e2d3ebe4893bda7e52f30900256.jpg' 
                            style={fig}
                            />
                        </div>
                    </li>
                    <li>
                        <p style={listItem}>
                        Select <strong>Proceed</strong> to confirm the forwarding address.
                        </p>
                        <div style={listItem}>
                            <img src='https://www.lifewire.com/thmb/SIiLp_BQNPj-m6LFSZEzKHvFd-E=/2046x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/005-how-to-forward-gmail-email-using-filters-1171934-e054002baa1e45c19a294cc0b9e1ba97.jpg' 
                            style={fig}
                            />
                        </div>
                        {/* <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => this.handleClick(event)}>
                            Click to get the code
                        </Button> */}
                        <AwesomeButtonProgress 
                        loadingLabel='Getting the token..'
                        type="primary"
                        onPress={next => {this.handleClick()}}>
                            Click to get the token
                        </AwesomeButtonProgress>
                    </li>
                </ol>
                <div>
                
                </div>
            </div>
        )
    }
}

export default GmailForwarder



