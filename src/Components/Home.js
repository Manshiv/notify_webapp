import React, {Component} from 'react'
import axios from 'axios';
import CommonAppBar from './CommonAppBar';
import home_page1 from '../images/home_page1.svg';
import home_page2 from '../images/home_page2.svg';
import Typography from '@material-ui/core/Typography';

class Home extends Component{

    constructor(props){
        super(props)
    }

    render(){
        const bckgd = {
            background: 'linear-gradient(to bottom, #5b5b5b 0%, #272727 100%)',
            height: '100vh',
            width: '100%',
        }
        return(
            <div>
                <CommonAppBar title='Home'/>
                <div style={bckgd}>
                    <table>
                        <tbody>
                            <tr>
                                <td width='20%'>
                                    <div font-family='Roboto'>
                                    <Typography 
                                    variant='h5'>
                                    connect here everything
                                    </Typography>
                                    </div>
                                    
                                </td>
                                <td width='60%'>
                                    <img src={home_page1}/>
                                </td>
                                
                                <td width='10%'>
                                    <img src={home_page2} />
                                </td>
                            </tr>
                            <tr>
                                
                            </tr>
                        </tbody>
                    </table>                    
                </div>
            </div>
        )
    }
}
export default Home