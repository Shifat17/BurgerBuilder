import React, { Component } from "react";
import Aux from "../../../../HOC/Aux";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("Order Summary Updated");
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "uppercase" }}>{igKey} </span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following Ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          Total Price: <strong>{this.props.price.toFixed(2)}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
