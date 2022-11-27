import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LoginA from "./components/LoginA";
import PaymentA from "./components/PaymentA";
import RecipesA from "./components/RecipesA";
import ShoppingA from "./components/ShoppingA";
import Other from "./components/Other";
import Recipeinfo from "./components/Recipeinfo";
import Profile from "./components/Profile";
import OrdersDashA from "./components/OrdersDashA";
import SavedRecipes from "./components/SavedRecipes";
import CartNadia from "./components/CartNadia";

function App() {
  return (
    <div className="App">
      <Navbar className="bg-success" bg="success" expand="lg">
        Welcome to FSPT12 Recipe's App
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/other">Other</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/payment">Payment</Nav.Link>
            <Nav.Link as={NavLink} to="/recipes">Recipe search</Nav.Link>
            <Nav.Link as={NavLink} to="/saved_recipes">Saved recipes</Nav.Link>
            <Nav.Link as={NavLink} to="/shopping">Shopping Cart</Nav.Link>
            <Nav.Link as={NavLink} to="/cartN">Nadia Cart</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>


      <Routes>
        <Route path="other" element={<Other />} />
        <Route path="login" element={<LoginA />} />
        <Route path="payment" element={<PaymentA />} />
        <Route path="recipes" element={<RecipesA />} />
        <Route path="shopping" element={<ShoppingA />} />
        <Route path="saved_recipes" element={<SavedRecipes />} />
        <Route path="cartN" element={<CartNadia />} />
        <Route path="recipeinfo/:id" element={<Recipeinfo />} />
        <Route path="profile" element={<Profile />} />
        <Route path="ordersdash" element={<OrdersDashA />} />
      </Routes>
    </div>
  );
}

export default App;
