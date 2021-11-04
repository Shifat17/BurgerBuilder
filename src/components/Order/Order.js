import React from "react";
import classes from "./Order.css";
function Order(props) {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      amount: props.ingredients[ingredientName],
      name: ingredientName,
    });
  }

  const ingredientOutputs = ingredients.map((ingredient) => (
    <span
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px",
        boxSizing: "border-box",
      }}
    >
      {ingredient.name} ({ingredient.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>ingredients: {ingredientOutputs}</p>
      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
}

export default Order;
