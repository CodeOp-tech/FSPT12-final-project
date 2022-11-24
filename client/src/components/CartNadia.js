import React, {useState, useEffect, useContext} from 'react';
import { Context } from "../Context";
import {Card, Button} from 'react-bootstrap';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { MultiSelect } from "react-multi-select-component";
import Ingredient from './Ingredient';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";


export default function CartNadia() {

    const {orderedRecipes, setOrderedRecipes} = useContext(Context);

    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [clickedID, setID] = useState();
    
    useEffect(() => {
      getRecipes();
     }, []);


    const getRecipes = () => {
     
      fetch('/saved_recipes')
      .then(res => res.json())
      .then(json => json.filter(e => e.recipe_orderStatus==1))
      .then(json=>setRecipes(json))
            
    
     .catch(error => {
      console.log(error);
      
     });
     }
     
     const handleClick = async (id) => {

      setID(id);

      const response = await fetch(
        `${BASE_URL}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`,
        {
          method: "GET",
        }
      );
      const info = await response.json();
      console.log(info.ingredients);  
      setIngredients(info.ingredients);
     }


    //  const getIngredients = async (id) => {
    //   const response = await fetch(
    //     `${BASE_URL}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`,
    //     {
    //       method: "GET",
    //     }
    //   );
    //   const info = await response.json();
    //   console.log(info.ingredients);  
    //   setIngredients(info.ingredients);
    
    //    } 
     
 
    
    return (
    <div>
      <h1>Here are your ordered recipes</h1> 
      <Splide 
        options={{
          perPage: 3,
          drag: "free",
          gap: "5rem",
        }}
   >
      {recipes.map((recipe) => {
      return (
        <SplideSlide>      
          <Card style={{"width":"40rem", "fontSize": "10"}} key={recipe.recipe_ID}>
          <Card.Header>{recipe.recipe_title}</Card.Header>
          <Card.Img src={recipe.recipe_image} alt={recipe.recipe_title} /> 
          <Button onClick={()=>handleClick(recipe.recipe_ID)}>Order ingredients</Button>
          {(clickedID===recipe.recipe_ID) && (
            <Ingredient ingredients={ingredients} />
          )}
          </Card>      
        </SplideSlide> 
      )
    }
    )}    
    </Splide>
    </div>
  )
}
