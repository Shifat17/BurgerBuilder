import React from "react";
import classes from "./BuildControl.css";
function BuildControl(props) {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removeIngredient}
        disabled={props.isDisabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.addIngredient}>
        More
      </button>
    </div>
  );
}

export default BuildControl;
