import React, {useState, useEffect, useContext} from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Card, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from "../Context";


export default function SavedRecipes() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([{recipe_image: "", recipe_title: "", recipe_summary: ""}]);
    const {orderedRecipes, setOrderedRecipes} = useContext(Context);


    useEffect(() => {
     getRecipes();
    }, []);
 
    const getRecipes = () => {
    
     fetch('/saved_recipes')
     .then(res => res.json())
     .then(json => {
       console.log(json);
       setRecipes(json);
     })      
   
    .catch(error => {
     console.log(error);
     
    });
    }  
    
    const deleteRecipe = async(recipe_ID) => {
        // delete a recipe from the database
        const response = await fetch(`/saved_recipes/${recipe_ID}`, {
            method: "DELETE"    
        });   
            const recipes = await response.json();
            setRecipes(recipes); 
            alert("Recipe deleted successfully!");   
    }

    const navigateToCart = () => {
     
      navigate('/cartN');

    }
 
  return (
    <div>Here are your saved recipes

  
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
      <Card style={{"width":"10rem", "fontSize": "10"}} key={recipe.recipe_ID}>
       <Card.Header>{recipe.recipe_title}</Card.Header>
       <Card.Img src={recipe.recipe_image} alt={recipe.recipe_title} /> 
       {/* check if the recipe is already added to the cart of not */}
       {orderedRecipes.includes(recipe.recipe_ID) ?

       <Button onClick={navigateToCart}>View cart</Button>       
       :
       <Button onClick={() => setOrderedRecipes(recipe.recipe_ID)}>Add to cart</Button>       
    }
       <Button onClick={() => deleteRecipe(recipe.recipe_ID)}>Delete recipe</Button>
  

       
    </Card>      
    </SplideSlide> 
      )
    }
    )}    
    </Splide>   



    </div>
  )
}
