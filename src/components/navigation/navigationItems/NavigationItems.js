import React from 'react';
import NavigationItem from './navigationItem/NavigationItem';
import classes from './NavigationItems.css';

function NavigationItems(props) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        BurgerBuilder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/Auth">Authentication</NavigationItem>
      ) : (
        <NavigationItem link="/logout">LogOut</NavigationItem>
      )}
      {/* <button className={classes.button}>X</button> */}
    </ul>
  );
}

export default NavigationItems;
