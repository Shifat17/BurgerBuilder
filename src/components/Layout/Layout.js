import React, { Component } from 'react';
import Aux from '../../HOC/Aux';
import classes from './Layout.css';
import { connect } from 'react-redux';
import Toolbar from '../navigation/Toolbar/Toolbar';
import SideDrawer from '../navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSidebarHandler = () => {
    this.setState((state) => {
      return { showSideDrawer: !state.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          toggleSidebar={this.toggleSidebarHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
