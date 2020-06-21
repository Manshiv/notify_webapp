import React, {Component} from 'react'
import { flexbox } from '@material-ui/system';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CommonAppBar from './CommonAppBar'



class GmailForwarder extends Component{

    constructor(props){
        super(props)
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
        return(
            <div>
                <CommonAppBar title='Forwarder' /> 
                <ol>
                    <li >
                        <p style={listItem}>
                            Click the <strong>Gear</strong> icon at the top right corner of the Gmail screen and select Settings from the drop-down menu that appears.
                        </p>
                        <div style={listItem}>
                            <img src='https://www.lifewire.com/thmb/AmSJU-WWxNB3CtI8UNiWVYrX2aw=/1851x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/002-how-to-delete-with-a-swift-keyboard-shortcut-in-gmail-1172079-c5d28b8872d341b6894b933566647158.jpg' 
                            style={fig}
                            /> 
                        </div>    
                    </li>
                    <li>
                        <p style={listItem}>
                            Select the <strong>Forwarding and POP/IMAP</strong> tab.
                        </p>
                        <div style={listItem}>
                            <img src='https://www.lifewire.com/thmb/pKKIdEZHki3gttZdvGArFHgeO2k=/1366x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/001-how-to-access-a-gmail-account-with-any-email-client-via-pop-4103715-a988658a0c8948eb819d4d7f79f8be8a.jpg' 
                            style={fig}
                            /> 
                        </div>
                    </li>
                    <li>
                        <p style={listItem}>
                            In the <strong>Forwarding</strong> box, click <strong>Add a forwarding address.</strong>
                        </p>
                        <div style={listItem}>
                            <img src='https://www.lifewire.com/thmb/Va0YEaGq5hJfgPEsHRo8OVAXCLE=/1414x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/001-how-to-forward-your-gmail-email-to-another-email-address-1171906-77be4e1436594918913f06951f74efa3.jpg' 
                            style={fig}
                            />
                        </div>
                    </li>
                    <li>
                        <p style={listItem}>
                            Enter the email address you want to forward future Gmail messages to.
                        </p>
                        <div style={listItem}>
                            
                        </div>
                    </li>
                    <li>
                        <p style={listItem}>
                        Select <strong>Proceed</strong> in the pop-up window, then press <strong>OK</strong>. Gmail will send a confirmation email to the address you want to forward to.
                        </p>
                        <div style={listItem}>
                            <img src='https://www.lifewire.com/thmb/xiPXn4vBYUHcyw7NkKRjs-a37tA=/1414x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/002-how-to-forward-your-gmail-email-to-another-email-address-1171906-1579af0dd861432ea2d7406b4d21bc26.jpg' 
                            style={fig}
                            />

                        </div>
                    </li>
                </ol>
            </div>
        )
    }
}

export default GmailForwarder



