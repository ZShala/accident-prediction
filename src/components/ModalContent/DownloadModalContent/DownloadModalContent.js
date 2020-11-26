import React from 'react';
import classes from './DownloadModalContent.module.css';
import CloseBtn from '../../../assets/images/cancel.png';

const modalContent = (props) => {

    return (
        <div className={classes.Modal}>
            <img className={classes.Cancel} src={CloseBtn} alt='Cancel' onClick={props.closed} />
            <p className={classes.Content}>Shkarkimi i hartës është kryer me sukses!</p>
        </div>
    );
};

export default modalContent;