import React from 'react';

import logoIcon from '../../assets/images/logo.png';
import classes from './Logo.module.css';
import emblem from '../../assets/images/emblem.png';
const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
    <img src={emblem} alt="emblem" />
    <img src={logoIcon} alt="logo" />
    </div>
);

export default logo;