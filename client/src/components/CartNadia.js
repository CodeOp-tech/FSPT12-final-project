import React, {useState, useEffect, useContext} from 'react';
import {Card} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Ingredient from './Ingredient';
import { Context } from "../Context";
import { useNavigate } from 'react-router-dom';


const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";
const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function CartNadia() {

    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [clickedID, setID] = useState();
    const {orderedIngredients, setOrderedIngredients, totalPrice, setTotalPrice} = useContext(Context);
    const navigate = useNavigate();


    useEffect(() => {
      getRecipes();
     }, []);

    console.log("Cart ordered ingredients: ", orderedIngredients);
    const getRecipes = () => {
     
      fetch('/saved_recipes')
      .then(res => res.json())
      .then(json => json.filter(e => e.recipe_orderStatus==1))
      .then(json=>setRecipes(json))
            
    
     .catch(error => {
      console.log(error);
      
     });
     } 
     


    function addToOrder (e) {
      e.preventDefault();
      const priceOfRecipe = +window.document.getElementById('price').innerText.replace( /^\D+/g, '');;
      setTotalPrice((prev) => prev + priceOfRecipe);

      
    }   
    
    function handleCheckout(price) {
       // add the selected recipe to the saved_recipes table
       fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_cost: price,
        user_id: 1        
      }),
    }).then((res) => res.json());

    alert("Order saved in DB!");
    //navigate('/payment');  

  };   

  const handleClick = async(id) => {

    const response = await fetch(
      `${BASE_URL}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`,
      {
        method: "GET",
      }
    );
    const info = await response.json();
    console.log(info.ingredients);  
    setIngredients(info.ingredients);
    setID(id);
    console.log("Ingredients fetched are: ",ingredients);
   // alert('Ingredients fetched!');
  }
    
 
    
    return (
    <div>
      <div className='row'>
      <div className="col">Here are your ordered recipes. Total price of the order is {getFormattedPrice(totalPrice)} </div>
      <div className="col">
       <button onClick={()=>handleCheckout(totalPrice)}>Checkout</button>  
      </div> 

      </div>
      
      <div className="row">

      {recipes.map((recipe) => {
      return (
        <div className="col-md-4 mb-4 text-center" key={recipe.recipe_ID}> 
         <Card className="h-100">
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
            </Card.Body>
            </Card>

           <Accordion>
              <Accordion.Item eventKey={recipe.recipe_ID} > 
                <Accordion.Header onClick={()=>handleClick(recipe.recipe_ID)}>Order ingredients</Accordion.Header>
           
                 <Accordion.Body>
                  {(clickedID===recipe.recipe_ID) && (  
                    <>
                <Ingredient ingredients={ingredients} servings={recipe.recipe_servings} /> 
                <button onClick={addToOrder}>Add to order</button>
                   </>
                  )}                
                 </Accordion.Body> 
               </Accordion.Item>
          </Accordion> 
          </Card> 
          </div>    

          )})}    
    </div>    
   
    </div>
  )
}
