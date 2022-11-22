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

//   const fetchRecipeIngredients = async () => {
//     const response = await fetch(
//       `${BASE_URL}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`,
//       {
//         method: "GET",
//       }
//     );
//     const info = await response.json();
//     console.log(info);
//     setRecipeIngredients(info);
//   };

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
                  <button>Add to cart</button>
                  <button onClick={addRecipe}>Save recipe</button>
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
                            <p>{ingredients.price}</p>
                            </div>
                        )})}
                        <p>Total cost per serving: {recipeIngredients.totalCostPerServing}</p>
                        <p>Total cost per person: {recipeIngredients.totalCost}</p>
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
