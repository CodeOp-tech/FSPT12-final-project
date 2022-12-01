import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import LoginA from "./components/LoginA";
import PaymentA from "./components/PaymentA";
import RecipesA from "./components/RecipesA";
import ShoppingCart from "./components/ShoppingCart";
import Recipeinfo from "./components/Recipeinfo";
import Home from "./components/Home";
import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import OrdersDashA from "./components/OrdersDashA";
import SavedRecipes from "./components/SavedRecipes";
import OrderHistory from "./components/OrderHistory";
import PaymentSuccess from "./components/PaymentSuccess";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <div>
        <NavBar />

        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoginA />} />
          <Route
            path="ordersdash"
            element={
              <PrivateRoute>
                <OrdersDashA />
              </PrivateRoute>
            }
          />
          <Route path="payment" element={<PaymentA />} />
          <Route path="recipes" element={<RecipesA />} />
          <Route path="saved_recipes" element={<SavedRecipes />} />
          <Route path="shopping" element={<ShoppingCart />} />
          <Route path="recipeinfo/:id" element={<Recipeinfo />} />
          <Route path="profile" element={<Profile />} />
          <Route path="order_history" element={<OrderHistory />} />
          {/*         <Route path="ordersdash" element={<OrdersDashA />} /> */}
          <Route path="payment-successful" element={<PaymentSuccess />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
