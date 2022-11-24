import React, { useEffect, useState, useContext } from "react";
//import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Context } from "../Context";

// const API_KEY = process.env.REACT_APP_API_KEY;
// const BASE_URL = "https://api.spoonacular.com/recipes";

export default function Recipeinfo({
  visible,
  closePane,
  recipeInfo,
  addToCart,
  saveRecipe,
  recipeIngredients  
}) 

{
  const {orderedRecipes, setOrderedRecipes} = useContext(Context);


  return (
    <SlidingPane
    className="sliding-pane"
    isOpen={visible}
    title="Return to recipe research"
    width={window.innerWidth < 600 ? "100%" : "600px"}
    onRequestClose={closePane}
  >

    <div>
      {/* IMG, QUICK FACTS */}
      <div className="container mt-4">
        <Card>
          <Card.Body>
            <div className="col-md-8 d-flex flex-row">
              <div>
                <img className="img-fluid" src={recipeInfo.image} alt="recipe_image"/>
              </div>
              <div className="ms-4">
                <h1>{recipeInfo.title}</h1>
                <p>Price per serving: {recipeInfo.pricePerServing}</p>
                <p>Ready in: {recipeInfo.readyInMinutes} minutes</p>
                <div>
                  <button onClick={addToCart}>Add to cart</button>
                  <button onClick={saveRecipe}>Save recipe</button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* INSTRUCTIONS */}
      <div className="container mt-4">
        <Card>
          <Card.Body>
            <div className="col-md-8">
              <h3>Instructions</h3>
              {recipeInfo.analyzedInstructions && (
                <div>
                  {recipeInfo.analyzedInstructions[0].steps.map((steps) => {
                    return (
                      <p key={steps.number}>
                        {steps.number}. {steps.step}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      

      {/* INGREDIENTS & PRICE */}
        <Card>
          <Card.Body>
            <div className="col-md-4 ms-4">
                  <h3>Ingredients</h3>
                  {recipeIngredients.ingredients && (
                    <div>
                        {recipeIngredients.ingredients.map((ingredients, index) => { return (
                            <div key={index} className="d-flex justify-content-between">
                            <p>{ingredients.name}</p>
                            <p>{ingredients.amount.us.value} {ingredients.amount.us.unit}</p>
                            </div>
                        )})}
                        <p>Total cost per serving: {recipeIngredients.totalCostPerServing/100} $</p>
                        <p>Total cost per person: {recipeIngredients.totalCost/100} $</p>
                    </div>
                  )}
            </div>
          </Card.Body>
        </Card>
        </div>
      
    </div>
    </SlidingPane>
  );
}
