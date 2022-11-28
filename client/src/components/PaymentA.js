import axios from "axios";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Context } from "../Context";
import {useContext} from 'react';

export default function PaymentA() {

  //create post request to store orders in the 'orders' table --> fetch & display in OrdersDash
  
  //create logic for counting delivery cost

  const navigate = useNavigate();

  const {orderedIngredients, setOrderedIngredients} = useContext(Context);

  //order objects with all the order details we need for the payment
  //need to pass this as props to PaymentSuccess.js
  const [order, setOrder] = useState({
    id: 123, //int
    order_cost: 200, //decimal
    delivery_cost: 20, //decimal
    user_id: 123, //int
    payment_date: "payment_date", //datetime
    delivery_status: false, //tinyint
    ordered_ingredients: ['apple', 'banana'], //varchar
  });

  const handleToken = async (token, addresses) => {
    const response = await axios.post("http://localhost:5002/checkout", {
      token,
      order,
    });

    //take the response and check for the status property
    if (response.status === 200) {
      //redirecting the user to the 'Payment Succesful' page
      navigate('/payment-successful');
      console.log("Payment successful.");
    } else {
      console.log("Payment unsuccessful.");
    }
  };

  return (
    <div>
      {/*<ToastContainer />*/}
      <div className="container">
        <h1 className="text-center m-5">Payment checkout</h1>
        <div className="form-group container">
          <StripeCheckout
            className="pay-btn"
            stripeKey="pk_test_51M56f8C8rWbcbjLQhdLEyScdQrQL4wj3RFqGlXaGPlXSl2lGnKXr9BjCQR9WD1uhtZfPy7GvuW276GBZMIFhUL1500xXgunrmM"
            token={handleToken}
            amount={order.price * 100}
            name={order.name}
            billingAddress
            shippingAddress
          />
        </div>
      </div>
    </div>
  );
}
