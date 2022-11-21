import './App.css'
import { Routes, Route } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LoginA from './components/LoginA'
import PaymentA from './components/PaymentA'
import RecipesA from './components/RecipesA'
import Recipeinfo from './components/RecipeInfo'
import ShoppingA from './components/ShoppingA'
import Other from './components/Other'
import { useState, createContext } from 'react'

function App() {
  const [active, setActive] = useState(true)

  return (
    <div className='App'>
      <Navbar className='bg-success' bg='success' expand='lg'>
        Welcome to FSPT12 Recipe's App
        <Navbar.Toggle aria-controls='basic-navbaxxr-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='other'>Other</Nav.Link>
            <Nav.Link href='login'>Login</Nav.Link>
            <Nav.Link href='payment'>Payment</Nav.Link>
            <Nav.Link href='recipes'>Recipe search</Nav.Link>
            <Nav.Link href='shopping'>Shopping Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path='other' element={<Other />} />
        <Route path='login' element={<LoginA />} />
        <Route path='payment/:id' element={<PaymentA />} />
        <Route path='recipes' element={<RecipesA />} />
        <Route path='Shopping' element={<ShoppingA />} />
        <Route path='Recipeinfo/:id' element={<Recipeinfo />} />
      </Routes>
    </div>
  )
}

export default App
