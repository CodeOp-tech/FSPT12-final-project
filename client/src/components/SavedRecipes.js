import React, {useState, useEffect} from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Card, Button} from 'react-bootstrap';

export default function SavedRecipes() {

    const [recipes, setRecipes] = useState([{recipe_image: "", recipe_title: "", recipe_summary: ""}]);
  
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
       <Button href={`${recipe.recipe_summary}`} target="_blank">View recipe</Button>
       <Button>Add to cart</Button>       
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
