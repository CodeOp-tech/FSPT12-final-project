import React, {useState, useEffect} from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";
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
      <Card style={{"width":"10rem", "fontSize": "10"}}>
       <Card.Header>{recipe.recipe_title}</Card.Header>
       <Card.Img src={recipe.recipe_image} alt={recipe.recipe_title} />       
       <a href={`${recipe.recipe_summary}`} target="_blank">
       <Button>View Recipe</Button>
       </a>
       
    </Card>      
    </SplideSlide> 
      )
    }
    )}    
    </Splide>   



    </div>
  )
}
