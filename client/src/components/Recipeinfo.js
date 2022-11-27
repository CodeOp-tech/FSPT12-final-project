import React, { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export default function Recipeinfo({
  visible,
  closePane,
  id 
}

) {
  const [recipeInfo, setRecipeInfo] = useState([]); //store the recipe info here
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  //const { id } = useParams(); //get ID from clicked button (view recipe) in recipe search
  const [updatePane, setUpdatePane] = useState({ visible: false });


  useEffect(() => {
    fetchRecipeInfo();
    fetchRecipeIngredients();
  }, []);

  const fetchRecipeInfo = async () => {

    console.log("This is recipe id ", id);
    const response = await fetch(
      `${BASE_URL}/${id}/information?apiKey=${API_KEY}`,
      {
        method: "GET",
      }
    );
    const info = await response.json();
    console.log(info);
    setRecipeInfo(info);
  };

  const addRecipe = () => {
  // add the selected recipe to the saved_recipes table 
  fetch("/saved_recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({'recipe_ID': id, 'user_id': 1, 'recipe_image':recipeInfo.image, 'recipe_title':recipeInfo.title, 'recipe_summary':recipeInfo.spoonacularSourceUrl})
  })

.then (res => res.json()) 
alert("Recipe saved :)");
 }

  const fetchRecipeIngredients = async () => {
    const response = await fetch(
      `${BASE_URL}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`,
      {
        method: "GET",
      }
    );
    const info = await response.json();
    console.log(info);
    setRecipeIngredients(info);
  };

  return (
    <SlidingPane
    className="sliding-pane"
    isOpen={visible}
    title="Return to recipe research"
    width={window.innerWidth < 600 ? "100%" : "800px"}
    onRequestClose={closePane}
  >

    <div>
      {/* IMG, QUICK FACTS */}
      <div className="container-fluid mt-2">
        <Card>
          <Card.Body>
            <div className="container d-flex flex-row">
              <div className="w-50">
                <img className="img-fluid rounded" src={recipeInfo.image} />
              </div>
              <div className="ms-3 w-50">
                <h1>{recipeInfo.title}</h1>
                <p><strong>Price per serving: € {recipeInfo.pricePerServing}</strong></p>
                <p><strong>Ready in: {recipeInfo.readyInMinutes} minutes</strong></p>
                <div className="d-flex w-100">
                  <button className="btn btn-success">Add to cart</button>
                  <button className="btn btn-success ms-1" onClick={addRecipe}>Save recipe</button>
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
            <div className="container">
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
      </div>

      {/* INGREDIENTS & PRICE */}
      <div className="container mt-4">

        <Card>
          <Card.Body>
            <div className="col-md-8 ms-4">
                  <h3>Ingredients</h3>
                  {recipeIngredients.ingredients && (
                    <div>
                        {recipeIngredients.ingredients.map((ingredients, index) => { return (
                            <div key={index} className="d-flex justify-content-between">
                            <p>{ingredients.name}</p>
                            <p>{ingredients.price}</p>
                            </div>
                        )})}
                        <hr/>
                        <div className="d-flex flex-wrap">
                        <p className="w-100">Total cost per serving: {recipeIngredients.totalCostPerServing}</p>
                        <p className="w-100">Total cost per person: {recipeIngredients.totalCost}</p>
                        </div>
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
