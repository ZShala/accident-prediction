import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Modal from '../UI/Modal/Modal';
import DownloadModalContent from '../ModalContent/DownloadModalContent/DownloadModalContent';
import AddModalContent from '../ModalContent/AddModalContent/AddModalContent';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showDownloadModal: false,
        showAddModal: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
    modalClosedHandler = () => {
        this.setState({ showDownloadModal: false, showAddModal: false });
    }

    showAddModalHandler = () => {
        this.setState({ showAddModal: true })
    }

    showDownloadModalHandler = () => {
        this.setState({ showDownloadModal: true })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} downloadModalClicked={this.showDownloadModalHandler} addModalClicked={this.showAddModalHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    <Modal show={this.state.showDownloadModal} modalClosed={this.modalClosedHandler}>
                        <DownloadModalContent closed={this.modalClosedHandler} />
                    </Modal>
                    <Modal show={this.state.showAddModal} modalClosed={this.modalClosedHandler}>
                        <AddModalContent closed={this.modalClosedHandler} />
                    </Modal>
                    {this.props.children}
                </main>
           
            </Auxiliary>
        )
    }
}

export default withRouter(Layout);