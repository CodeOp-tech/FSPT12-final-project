import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './shoppingA.css'
import { NavLink } from 'react-router-dom'
import { FaMinus, FaPlus } from 'react-icons/fa'

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = 'https://api.spoonacular.com/recipes'

export default function ShoppingCart() {
  const [orders, setOrders] = useState([]) //store the orders here
  const { id } = useParams() //get ID from clicked button (view recipe) in recipe search
  const { reduction, increase, removeProduct } = ['']
  const [totalOrders, settotalOrders] = useState([])
  const FormatPrice = ({ price }) => {
    return Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(price / 100)
  }

  const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
    return (
      <div className='cart-button'>
        <div className='amount-toggle'>
          <button onClick={() => setDecrease()}>
            <FaMinus />
          </button>
          <div className='amount-style'>{amount}</div>
          <button onClick={() => setIncrease()}>
            <FaPlus />
          </button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    fetchOrdersInfo()
    // fetchRecipeIngredients();
  }, [])

  const fetchOrdersInfo = async () => {
    const response = await fetch(
      `${BASE_URL}/${id}/information?apiKey=${API_KEY}`,
      {
        method: 'GET',
      }
    )
    const info = await response.json()
    console.log(info)
    setOrders(info)
  }

  return (
    <div className='container'>
      <div className='cart_heading grid grid-five-column'>
        <p>Item</p>
        <p className='cart-hide'>Price</p>
        <p>Quantity</p>
        <p className='cart-hide'>Subtotal</p>
        <p>Remove</p>
      </div>
      <hr />

      <div className='cart-item'>
        <Card>
          <Card.Body>
            <div className='cart_heading grid grid-five-column'>
              <div>
                <figure>
                  <img
                    className='cart-image--name'
                    src={orders.image}
                    style={{ width: 80, height: 80 }}
                  />
                </figure>
              </div>
              <div className='color-div'>
                <h5>{orders.title}</h5>

                {/* price   */}
                <div className='cart-hide'></div>
                <p>
                  <FormatPrice price={orders.pricePerServing} />
                </p>
                <div className='amount'>
                  <button
                    className='count'
                    onClick={() => reduction(orders.id)}
                  >
                    {' '}
                    -1{' '}
                  </button>

                  <span>{orders.count}</span>
                  <button className='count' onClick={() => increase(orders.id)}>
                    {' '}
                    +1{' '}
                  </button>

                  <div className='cart-two-button'>
                    <NavLink to='/RecipesA'>
                      <Button> continue Shopping </Button>
                    </NavLink>
                    <Button
                      className='btn btn-clear'
                      onClick={() => delete orders.id}
                    >
                      clear cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <span></span>
        <div>
          <Link to={`/payment/${orders.id}`}>
            <Button>Payment</Button>
          </Link>
        </div>
      </div>
      {/* subtotal */}
      <div className='cart-hide'>
        <p>
          <FormatPrice price={orders.price * orders.id} />
        </p>
      </div>

      {/* TOTAL AMOUNT */}
      <div className='order-total--amount'>
        <div className='order-total--subdata'>
          <p>delivery</p>
          <p>subtotal: ${orders.pricePerServing}</p>
          <p> total amount: $</p>
        </div>
      </div>
    </div>
  )
}
