import React, {useState, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SavedRecipes() {
    const navigate = useNavigate();
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

    const navigateToCart = () => {
     
      navigate('/cartN');

    }

    const addToCart = (id) => {
    
    // 4. In recipes_saved, put orderStatus to true
      fetch(`/saved_recipes/${id}`, {
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
    <div>
      <h1 className='text-center'>Welcome to your favourite recipes</h1>  
      <div className="container">

    <div className="row">

    {recipes.map((recipe) => {
      return (
        <div className="col-md-4 mb-4 text-center" key={recipe.recipe_ID}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={recipe.recipe_image}
                      alt={recipe.recipe_title}
                    />
                    <Card.Body className="d-flex flex-wrap justify-content-center">
                      <Card.Title className="mt-2 w-100">
                        {recipe.recipe_title}
                      </Card.Title>
                      <div className="d-flex flex-wrap justify-content-center">
                         {/* check if the recipe is already added to the cart of not */}
                        {(recipe.recipe_orderStatus==1) ?

                        <Button 
                        className="mt-2 w-100 align-self-end"
                        onClick={navigateToCart}>View cart</Button>       
                         :
                         <Button 
                         className="mt-2 w-100 align-self-end"
                         onClick={()=>addToCart(recipe.recipe_ID)}>Add to cart</Button>       
                        }
                        <Button
                          className="mt-2 w-100 align-self-end"
                          onClick={() => deleteRecipe(recipe.recipe_ID)}
                        >
                          Delete recipe
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div> 
      ) } )} 

    </div>
    </div>
    </div>


  )
}
