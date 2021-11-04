import React, { Component } from 'react';
import Aux from '../../HOC/Aux';
import Burger from '../../components/Layout/Burger/Burger';
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Layout/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import {
  addIngredient,
  removeIngredient,
  initIngredients,
} from '../../store/actions/burgerBuilder';

import WithErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';
import axiosInstance from '../../axios-orders';
import { purchaseInit } from '../../store/actions/order';
import { setAuthRedirectPath } from '../../store/actions/auth';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInintIngredients();
  }

  updatePurchaseableState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    let orderSummary = null;

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdd}
            ingredientRemoved={this.props.onIngredientRemove}
            price={this.props.price}
            auth={this.props.isAuthenticated}
            isDisabled={disabledInfo}
            ordered={this.purchaseHandler}
            isPurchaseable={this.updatePurchaseableState(this.props.ings)}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {this.state.purchasing ? orderSummary : null}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdd: (ingName) => {
      return dispatch(addIngredient(ingName));
    },
    onIngredientRemove: (ingName) => {
      return dispatch(removeIngredient(ingName));
    },
    onInintIngredients: () => {
      return dispatch(initIngredients());
    },
    onPurchaseInit: () => {
      return dispatch(purchaseInit());
    },
    onSetRedirectPath: (path) => {
      return dispatch(setAuthRedirectPath(path));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axiosInstance));
