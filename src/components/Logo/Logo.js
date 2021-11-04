import React from "react";
import burgerLoader from "../../assets/images/burger-logo.png";
import classes from "./Logo.css";
function Logo(props) {
  return (
    <div className={classes.Logo}>
      <img src={burgerLoader} alt="logo" />
    </div>
  );
}

export default Logo;
