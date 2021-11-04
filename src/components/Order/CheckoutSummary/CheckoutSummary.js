import React from "react";
import Burger from "../../Layout/Burger/Burger";
import Button from "../../Layout/UI/Button/Button";
import classes from "./CheckoutSummary.css";
function CheckoutSummary(props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope It tastes well</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  );
}

export default CheckoutSummary;
