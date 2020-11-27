import React from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Maps.module.css';
import Footer from '../Footer/Footer';

const Maps = (props) => (
    <div> 
        <h1> TE DUA 🥰😍😘 </h1>
        <Footer clicked={() => (props.history.goBack())} arrow='&#8963;'/>
    </div>
)

export default withRouter(Maps);