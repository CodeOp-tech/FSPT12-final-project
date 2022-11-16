import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const animatedComponents = makeAnimated();

export default function RecipesA() {

  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState([]);
  const [intolerance, setIntolerance] = useState([]);
  const [mealType, setMeal] = useState([]);
  const [userInput, setInput] = useState([]);  

  // should we put into the DB table? 
  const dietOptions = [
    { value: 'gluten-free', label: 'gluten-free' },
    { value: 'ketogenic', label: 'ketogenic' },
    { value: 'vegetarian', label: 'vegetarian'}
  ]

  const mealTypes = [
    { value: 'main course', label: 'main course'},
    { value: 'snack', label: 'snack'},    
    { value: 'breakfast', label: 'breakfast'}
  ]

  const intolerances = [
    {value: "dairy", label: "dairy"},
    {value: "egg", label: "egg"},
    {value: "soy", label: "soy"}
  ]

  let intoleranceAPI = intolerance.map((e) => e.value)
  let dietAPI = diet.map((e)=>e.value);
  let mealTypeAPI = mealType.map((e)=>e.value);

  
   const getRecipes = async() => {
    const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${userInput}&diet=${dietAPI}&intolerances=${intoleranceAPI}&type=${mealTypeAPI}&number=6&addRecipeInformation=true`);
    const data = await api.json();
    setRecipes(data.results);    
  }

  function handleInput (e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getRecipes();    
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
        <SplideSlide>      
      <Card style={{"width":"10rem", "fontSize": "10"}}>
       <Card.Header>{recipe.title}</Card.Header>
       <Card.Img src={recipe.image} alt={recipe.title} />
       <Button variant="primary">Add recipe</Button>
    </Card>      
    </SplideSlide> 
      )
    }
    )}    
    </Splide>   
   </div>

    </div>
    
  )
}
