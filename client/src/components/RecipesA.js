import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Select from "react-select";
import makeAnimated from "react-select/animated";
// import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/react-splide/css";
import Recipeinfo from "./Recipeinfo";

const animatedComponents = makeAnimated();

const API_KEY = process.env.REACT_APP_API_KEY;

export default function RecipesA() {

  console.log(API_KEY);

  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState([]);
  const [intolerance, setIntolerance] = useState([]);
  const [mealType, setMeal] = useState([]);
  const [userInput, setInput] = useState([]);
  const [addPane, setAddPane] = useState({ visible: false });
  const [recipeID, setRecipeId] = useState();

  // should we put into the DB table?
  // https://spoonacular.com/food-api/docs#Diets
  const dietOptions = [
    { value: "gluten-free", label: "gluten-free" },
    { value: "ketogenic", label: "ketogenic" },
    { value: "vegetarian", label: "vegetarian" },
    { value: "lacto-vegetarian", label: "lacto-vegetarian" },
    { value: "vegan", label: "vegan" },
    { value: "whole30", label: "whole30" },
  ];

  // https://spoonacular.com/food-api/docs#Meal-Types
  const mealTypes = [
    { value: "main course", label: "main course" },
    { value: "snack", label: "snack" },
    { value: "breakfast", label: "breakfast" },
    { value: "dessert", label: "dessert" },
    { value: "side dish", label: "side dish" },
    { value: "salad", label: "salad" },
  ];

  // https://spoonacular.com/food-api/docs#Intolerances

  const intolerances = [
    { value: "dairy", label: "dairy" },
    { value: "egg", label: "egg" },
    { value: "soy", label: "soy" },
    { value: "peanut", label: "peanut" },
    { value: "wheat", label: "wheat" },
    { value: "grain", label: "grain" },
  ];

  let intoleranceAPI = intolerance.map((e) => e.value);
  let dietAPI = diet.map((e) => e.value);
  let mealTypeAPI = mealType.map((e) => e.value);

  const getRecipes = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${userInput}&diet=${dietAPI}&intolerances=${intoleranceAPI}&type=${mealTypeAPI}&number=6&addRecipeInformation=true`
    );
    const data = await api.json();
    setRecipes(data.results);
  };

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getRecipes();
  }

  function viewRecipe(id) {
    setAddPane({ visible: true });
    setRecipeId(id);
  }

  return (
    <div className="container-xxl">
      
      <div className="mt-4 mb-4">
        <h1 className="text-center">Discover new recipes you'll love</h1>
        <p className="text-center">
          Enter your eating preferences, restrictions, needs and more.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-success">
                {" "}
                Select your diet restrictions{" "}
              </div>

              <div className="card-body">
                <div className="form-group">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={dietOptions}
                    onChange={(value) => setDiet(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-success">
                {" "}
                Select your intolerances{" "}
              </div>

              <div className="card-body">
                <div className="form-group">
                  {/* <label className="form-label">
                    Meal type
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={mealTypes}
                      onChange={(value) => setMeal(value)}
                    />
                  </label> */}

                  {/* <label className="form-label"> */}
                    {" "}
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={intolerances}
                      onChange={(value) => setIntolerance(value)}
                    />
                  {/* </label> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-success">
                {" "}
                Select a meal type{" "}
              </div>

              <div className="card-body">
                <div className="form-group">
                  {/* <label className="form-label"> */}
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={mealTypes}
                      onChange={(value) => setMeal(value)}
                    />
                  {/* </label> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-success">
                {" "}
                Search by ingredient, recipe name or random word{" "}
              </div>
              <div className="card-body">
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={(e) => handleInput(e)}
                    value={userInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4 justify-content-center">
          <div className="col-md-8">
        <button className="btn btn-success center" type="submit">
          Search recipes
        </button>  
        </div>        
        </div>

      </form>
 

      <div className="container text-center">
        <div className="row">
          {/* <Splide 
   options={{
    perPage: 3,
    drag: "free",
    gap: "5rem",
   }}
   > */}

          {recipes.map((recipe) => {
            return (
              // <SplideSlide key={recipe.id}>
              <div className="col-md-3 mb-4" key={recipe.id}>
                {/* <Card style={{"width":"10rem", "fontSize": "10"}} > */}
                <Card className="h-100">
                  {/* <Card.Header>{recipe.title}</Card.Header> */}
                  <Card.Img
                    variant="top"
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  <Card.Body className="d-flex flex-wrap justify-content-center">
                    <Card.Title className="mt-2 align-self-start">{recipe.title}</Card.Title>
                    <Button className="mt-2 align-self-end" onClick={() => viewRecipe(recipe.id)}>
                      View recipe
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              // </SplideSlide>
            );
          })}
          {addPane.visible && (
            <Recipeinfo
              visible={addPane.visible}
              closePane={() => setAddPane({ visible: false })}
              id={recipeID}
            />
          )}

          {/* </Splide>    */}
        </div>
      </div>
    </div>
  );
}
