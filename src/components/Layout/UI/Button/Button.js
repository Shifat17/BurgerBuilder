import React from "react";
import classes from "./Button.css";
function Button(props) {
  return (
    <button
      disabled={props.isDisable}
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
}

export default Button;
