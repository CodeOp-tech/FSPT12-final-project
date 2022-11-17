import axios from 'axios';
import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
//for displaying a notification about the payment
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PaymentA() {

  //order objects with all the order details we need for the payment
  const [order, setOrder] = useState({
    name: "Sample",
    price: "200",
    description: "This is a sample order."
  });

  const  handleToken = async (token, addresses) => {
    const response = await axios.post('http://localhost:5000/checkout', {token, order})
    
    //take the response and check for the status property
    console.log(response.status)

    if(response.status === 200) {
      toast.success("Payment successful.", {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      toast.error("Payment error.", {
        position: toast.POSITION.TOP_CENTER
      });
    }

  }

  return (
    <div>
      {/*<ToastContainer />*/}
      <div className='container'>
        <h1 className='text-center m-5'>Payment checkout</h1>
        <div className='form-group container'>
          <StripeCheckout className='pay-btn' stripeKey='pk_test_51M56f8C8rWbcbjLQhdLEyScdQrQL4wj3RFqGlXaGPlXSl2lGnKXr9BjCQR9WD1uhtZfPy7GvuW276GBZMIFhUL1500xXgunrmM'
          token={handleToken}
          amount={order.price*100}
          name={order.name}
          billingAddress
          shippingAddress/>
        </div>
      </div>
    </div>
  )
}
