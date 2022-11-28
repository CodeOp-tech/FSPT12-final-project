import React, { useState } from "react";
import { Context } from "../Context";
import {useContext} from 'react';

export default function PaymentSuccess() {

  const {orderedIngredients, setOrderedIngredients} = useContext(Context);

  const [order, setOrder] = useState({
    id: 123, //int
    order_cost: 200, //decimal
    delivery_cost: 20, //decimal
    user_id: 123, //int
    payment_date: "payment_date", //datetime
    delivery_status: false, //tinyint
    ordered_ingredients: "123, 456", //varchar
  });

  //I need to fetch the list of ingredients based on the recipe ids.

  console.log(orderedIngredients);

  return (
    <div>
      <h1>Thank you for your order! Your payment was successful.</h1>
      <h3>Order Summary</h3>

      <div className="list-group">

      {/*loop through some kind of object with info about ingrediens and quantities*/}

        <p
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{orderedIngredients[0]}</h5>
            <small>Price in total: 5$</small>
          </div>
          <p className="mb-1">
            Quantity: 3 pieces
          </p>
          <small>Recipe: Include recipe title here</small>
        </p>



        <p
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Banana</h5>
            <small>Price in total: 6$</small>
          </div>
          <p className="mb-1">
            Quantity: 2 pieces
          </p>
          <small>Recipe: Include recipe title here</small>
        </p>



        <p
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Walnut</h5>
            <small>Price in total: 8$</small>
          </div>
          <p className="mb-1">
            Quantity: 20 dkg
          </p>
          <small>Recipe: Include recipe title here</small>
        </p>
      </div>

    <h4>In total you paid: 29$ (Including delivery fee, which is 10$)</h4>

    <h5>We'll notify you when your orders is on the way.</h5>

    </div>
  );
}
