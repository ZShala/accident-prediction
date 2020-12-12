import React from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Maps.module.css';
import Footer from '../Footer/Footer';
import KosovoMap from '../../assets/images/kosovo-map.jpg';

const Maps = (props) => (
    <div> 
        <img src={KosovoMap} className={classes.Maps} alt="Harta e Kosoves"/>
        <Footer clicked={() => (props.history.goBack()) } arrow='&#8963;'/>
    </div>
)

export default withRouter(Maps);