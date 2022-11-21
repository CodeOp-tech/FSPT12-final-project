import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = 'https://api.spoonacular.com/recipes'

export default function ShoppingCart() {
  const [orders, setOrders] = useState([]) //store the orders here
  const { id } = useParams() //get ID from clicked button (view recipe) in recipe search
  const { reduction, increase, removeProduct } = ['']

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
    <div>
      <div className='container mt-12'>
        <Card>
          <Card.Body>
            <div className='col-md-12 d-flex flex-row'>
              <div>
                <img className='img-fluid' src={orders.image} />
              </div>
              <div className='ms-4'>
                <h1>{orders.title}</h1>
                <p>Price per Recipe: ${orders.pricePerServing}</p>
                <div className='amount'>
                  <button
                    className='count'
                    onClick={() => reduction(orders.id)}
                  >
                    {' '}
                    -{' '}
                  </button>
                  <span>{orders.count}</span>
                  <button className='count' onClick={() => increase(orders.id)}>
                    {' '}
                    +{' '}
                  </button>
                  <div
                    className='delete'
                    onClick={() => removeProduct(orders.id)}
                  >
                    X
                  </div>
                </div>

                <div>
                  <Link to={`/payment/${orders.id}`}>
                    <Button>Payment</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* TOTAL AMOUNT */}
    </div>
  )
}
