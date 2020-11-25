import React from 'react';
import Auxiliary from '../../UI/Button/Button';
import classes from './DownloadModalContent.module.css';
import CloseBtn from '../../../assets/images/cancel.png';

const modalContent = (props) => {

    return (
        <Auxiliary className={classes.Modal}>
            <img className={classes.Cancel} src={CloseBtn} alt='Cancel' onClick={props.closed}/>
            <p className={classes.Content}>Shkarkimi i hartës është bërë me sukses!</p>
        </Auxiliary>
    );
};

export default modalContent;