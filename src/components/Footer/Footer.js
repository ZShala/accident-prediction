import React from 'react';
import classes from './Footer.module.css';

const Footer = (props) => (
    <div className={classes.Footer} onClick={props.clicked}>
        <p>
            {props.children}
            {/* <br/>  */}
            {/* <span>{props.arrow}</span>   */}
        </p>
    </div>
);


export default Footer;