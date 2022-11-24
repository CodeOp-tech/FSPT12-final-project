import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Recipeinfo from './Recipeinfo';
import { Context } from "../Context";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

const animatedComponents = makeAnimated();

export default function RecipesA() {

  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState([]);
  const [intolerance, setIntolerance] = useState([]);
  const [mealType, setMeal] = useState([]);
  const [userInput, setInput] = useState([]); 
  const [addPane, setAddPane] = useState({ visible: false });
  const [recipeID, setRecipeId] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const {orderedRecipes, setOrderedRecipes} = useContext(Context);


  // should we put into the DB table? 
  // https://spoonacular.com/food-api/docs#Diets
  const dietOptions = [
    { value: 'gluten-free', label: 'gluten-free' },
    { value: 'ketogenic', label: 'ketogenic' },
    { value: 'vegetarian', label: 'vegetarian'},
    { value: 'lacto-vegetarian', label: 'lacto-vegetarian' },
    { value: 'vegan', label: 'vegan' },
    { value: 'whole30', label: 'whole30'}
  ]

// https://spoonacular.com/food-api/docs#Meal-Types
  const mealTypes = [
    { value: 'main course', label: 'main course'},
    { value: 'snack', label: 'snack'},    
    { value: 'breakfast', label: 'breakfast'},
    { value: 'dessert', label: 'dessert'},
    { value: 'side dish', label: 'side dish'},    
    { value: 'salad', label: 'salad'}
  ]

  // https://spoonacular.com/food-api/docs#Intolerances

  const intolerances = [
    {value: "dairy", label: "dairy"},
    {value: "egg", label: "egg"},
    {value: "soy", label: "soy"},
    {value: "peanut", label: "peanut"},
    {value: "wheat", label: "wheat"},
    {value: "grain", label: "grain"}
  ]

  let intoleranceAPI = intolerance.map((e) => e.value)
  let dietAPI = diet.map((e)=>e.value);
  let mealTypeAPI = mealType.map((e)=>e.value);

   const getRecipes = async() => {
    const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${userInput}&diet=${dietAPI}&intolerances=${intoleranceAPI}&type=${mealTypeAPI}&number=5&addRecipeInformation=true`);
    const data = await api.json();
    console.log(data.results);
    setRecipes(data.results);    
  }

  function handleInput (e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getRecipes();    
   }

   function viewRecipe(id) {
    setAddPane({ visible: true });
    setRecipeId(id);
    fetchRecipeIngredients(id);
   }

     
const fetchRecipeIngredients = async (id) => {
  const response = await fetch(
    `${BASE_URL}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`,
    {
      method: "GET",
    }
  );
  const info = await response.json();
  console.log(info);  
  setRecipeIngredients(info);

   } 
  
const saveRecipe = (recipeInfo) => {
      // add the selected recipe to the saved_recipes table 
      fetch("/saved_recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'recipe_ID': recipeInfo.id, 
          'user_id': 1,
          'recipe_image': recipeInfo.image, 
          'recipe_title':recipeInfo.title, 
          'recipe_instructions':recipeInfo.analyzedInstructions, 
          'recipe_pricePerServing':recipeInfo.pricePerServing,
          'recipe_readyInMinutes': recipeInfo.readyInMinutes
        })
       
      })
    
    .then (res => res.json()) 
     alert("Recipe saved :)");
}

const addToCart = (id) => {
  fetchRecipeIngredients(id);
  setRecipeId(id);
  // 1. Store recipe's ingredients, amount and prices when the user adds the recipe to cart, for later order cost calculation
  fetch("/ingredients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'recipe_ID': recipeID, 
      'ingredient_info': recipeIngredients      
    })
   
  })

.then (res => res.json()) 
// 2. Add recipe ID to the list of ordered recipes;

setOrderedRecipes(current => [...current, recipeID]);
saveRecipe(recipes.find((rec) => rec.id===recipeID));
// 3. In recipes_saved, put orderStatus to true
fetch(`/saved_recipes/${recipeID}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    'recipe_orderStatus': 1, 
  }) 
})
.then (res => res.json()) 

alert("Recipe added to cart!");

 }


   return (
    <div style={{"fontSize": "10"}}> Recipes search

     

        <form onSubmit={handleSubmit}>

        <div className="row">
        <div className="col">
        <div className="card">
        <div className="card-header bg-success"> Select your diet restrictions  </div>

        <div className="card-body">


        <div className='form-group'>
                        

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={dietOptions}
          onChange={(value)=>setDiet(value)}

        />           
        </div>

        </div>
        </div>
        </div>
        </div>

        <div className="row">
        <div className="col">
        <div className="card">
        <div className="card-header bg-success">  Meal type and intolerances   </div>

        <div className="card-body">
                      
          <div className='form-group'>           
            
            <label className='form-label'>Meal type
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={mealTypes}
                onChange={(value) => setMeal(value)}
              />                          
            </label>          


            
            <label className='form-label'> Intolerances
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={intolerances}
                onChange={(value)=> setIntolerance(value)}
            />
            </label>     

          </div>

          </div>
        </div>
        </div>
        </div>


        <div className="row">
        <div className="col">
        <div className="card">
        <div className="card-header bg-success"> Search by ingredient, recipe name or random word </div>
        <div className="card-body">

        <div className='form-group'>                       
               <input className = "form-control" onChange={(e) => handleInput(e)} value={userInput}/>
                        
        </div>

        </div>
        </div>
        </div>
        </div>

        <button className="btn btn-success center" type="submit">Search recipes</button>

        </form>  

    
  <div>

 <Splide 
   options={{
    perPage: 3,
    drag: "free",
    gap: "5rem",
   }}
   >
    {recipes.map((recipe) => {
      return (
        <SplideSlide key={recipe.id}>      
      <Card style={{"width":"10rem", "fontSize": "10"}} >
       <Card.Header>{recipe.title}</Card.Header>
       <Card.Img src={recipe.image} alt={recipe.title} />
       {/* <Button variant="primary">Add recipe</Button> */}
       {/* <Link to={`/recipeinfo/${recipe.id}`}> */}
       <Button onClick={() => viewRecipe(recipe.id)}>View recipe</Button>
       <Button onClick={() => addToCart(recipe.id)}>Add to cart</Button>
       <Button onClick={() => saveRecipe(recipe)}>Save recipe</Button>


       </Card>      
    </SplideSlide> 
      )})
     }
     {addPane.visible && 
       <Recipeinfo 
       visible={addPane.visible} 
       closePane={()=> setAddPane({visible: false})}
       recipeInfo={recipes.find((rec) => rec.id===recipeID)}
       addToCart={()=>addToCart(recipeID)}
       saveRecipe={()=>saveRecipe(recipes.find((rec) => rec.id===recipeID))}
       recipeIngredients={recipeIngredients}
       />
       }    
        
    </Splide>   
   </div>

    </div>
    
  )
}
