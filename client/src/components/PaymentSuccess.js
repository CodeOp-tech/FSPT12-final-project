import React, { useState } from "react";
import { Context } from "../Context";
import { useContext } from "react";

export default function PaymentSuccess() {
  const { orderedIngredients, setOrderedIngredients, totalPrice } = useContext(Context);

  console.log(orderedIngredients);

  return (
    <div>
      <h1 className="m-5">Thank you for your order! Your payment was successful.</h1>
      <h3 className="m-5">Order Summary</h3>

      <div className="list-group">
        {/*loop through object with info about ingrediens and quantities*/}

        {orderedIngredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{ingredient.name}</h5>
              {/* <small>Price: {(((ingredient.price / 100) * (ingredient.amount.metric.value)) / 100).toFixed(2)} USD</small> */}
            </div>
            <p className="mb-1">Amount: {ingredient.amount.metric.value} {ingredient.amount.metric.unit}</p>
          <small>Price per serving: {(ingredient.price / 100).toFixed(2)} USD</small>
          </div>
        ))}

        <h2 className="m-3">Total amount paid: {totalPrice} USD</h2>

        <h5 className="m-3">We'll notify you when your order is on the way.</h5>

      </div>

    </div>
  );
}
