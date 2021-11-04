import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'cheese', type: 'cheese' },
  { label: 'meat', type: 'meat' },
];

function BuildControls(props) {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: {props.price.toFixed(2)}</p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          addIngredient={() => props.ingredientAdded(ctrl.type)}
          removeIngredient={() => props.ingredientRemoved(ctrl.type)}
          isDisabled={props.isDisabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.isPurchaseable}
        onClick={props.ordered}
      >
        {!props.auth ? 'SignUp To Order' : 'ORDER NOW'}
      </button>
    </div>
  );
}

export default BuildControls;
