import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import downloadIcon from '../../../assets/images/download.png';
import plusIcon from '../../../assets/images/plus.png';

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" clicked={props.downloadMapClicked}>
            <img src={downloadIcon} alt="Download Map" />
        &nbsp; Shkarko hartën
        </NavigationItem>
        <NavigationItem link="/" clicked={props.addAccidentClicked}>
            <img src={plusIcon} alt="Add Accident" />
        &nbsp; Shto Aksident
        </NavigationItem>
    </ul>
);

export default navigationItems;