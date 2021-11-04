import React, { Component } from 'react';
import axiosInstance from '../../axios-orders';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import { fetchOrder } from '../../store/actions/order';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import WithErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrder(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
        console.log(order);
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        );
      });
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token, userId) => {
      return dispatch(fetchOrder(token, userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axiosInstance));
