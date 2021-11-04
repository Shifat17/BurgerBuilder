import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import LogOut from './containers/LogOut/LogOut';
import { checkAuthStatus } from './store/actions/auth';
import asyncComponent from './HOC/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/BurgerBuilder/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/Auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={LogOut} />
          <Route path="/Auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => {
      dispatch(checkAuthStatus());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
