import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../profile.css";
import { Card } from "react-bootstrap";
//import mysql from "mysql"; 

const User = () => {
  const [user, setUser] = useState([]);
  const [recipesSaved, setRecipesSaved] = useState([]);
  const [visible, setVisible] = useState(3);

/*   function fetchRecipesSaved() {
    console.log("asodsb");
    axios
      .get("https:localhost:5002/saved_recipes")
      .then(response => {
        setRecipesSaved(response.data.results);
        console.log(response.data.results);
      })
      .catch(error => console.log(error));
  } */
/*   async function  allRecipesSaved() {
    const response = await axios.get("https:localhost:5002/saved_recipes")
    setRecipesSaved(response.data.results)
  } */

 
  const loadMore = () => {
    setVisible(visible + 50);
  };

  useEffect(() => {
    allRecipesSaved();
  }, []);

  const allRecipesSaved = () => {
    
    fetch('/saved_recipes')
    .then(res => res.json())
    .then(json => {
      console.log(json);
      setRecipesSaved(json);
    })      
  
   .catch(error => {
    console.log(error);
    
   });
   } 

  useEffect(()=> {
    const getUser = async () => {
      try {
        const {data} = await axios("users/profile", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        setUser(data);
        console.log(data);
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  },[])

  const renderCard = (recipes_saved, index) => {
    return (
      <Card style={{ width: "18rem" }}>{user.map(user=>(
        <div className="name justify-content-center" key={recipes_saved.recipe_ID}>
        {<Card.Img variant="top" src={recipes_saved.recipe_image} style={{maxHeight:150, maxWidth:150}}/>}
        </div>
      ))}
        <Card.Body>
          <Card.Title className="text-center">
            {recipes_saved.recipe_title}
          </Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }; 
  

  return (
    <div>

     <section className="background" style={{minHeight:800, paddingTop:50, paddingBottom:50, paddingLeft:200, paddingRight:200}}>
      <div className="rounded" style={{background:"white", minHeight:700}}>
      <div className="container rounded-top" style={{background:"black", minHeight:100}}>
        <div className="row g-0 justify-content-start">
        <div className="col-3 d-flex justify-content-start" style={{paddingLeft:17, paddingTop:50}}>{user.map(user=>(
        <div className="name" key={user.id}>
        {user.profile_pic && <img src={user.profile_pic} className="img-thumbnail" style={{maxHeight:150, maxWidth:150}}/>}
        </div>
      ))}
      </div>
    <div
      className="col-3 fluid" style={{color:"white", paddingRight:420, paddingTop:160, fontFamily:"Playfair Display"}}>{user.map(user=>(
        <div className="name" key={user.id}>
          
        <h2>{user.firstname}</h2> <p>&nbsp;&nbsp;</p><h2>{user.lastname}</h2>
        </div>
      ))}
    </div>
      </div>
      </div>
      <div className="" style={{background:"#F8F8F8", minHeight:70}}>
        <div className="row g-0 justify-content-end">
          <div className="col-3 text-center" style={{paddingTop:5}} key={recipesSaved.recipe_ID}><h5>{recipesSaved.length}<br></br></h5>Recipes Saved
          </div>
          <div className="col-3 text-center" style={{paddingTop:5}}><h5>5<br></br></h5>Recipes Made
          </div>
        </div>
      </div>
      <section className="address" style={{color:"white", minHeight:300, paddingTop:50, paddingBottom:20, paddingLeft:20, paddingRight:20}}>
        <div className="text" style={{color:"black"}}><h4>Delivery Info</h4></div>
      <div className="contact" style={{background:"#F8F8F8", minHeight:150}}>
        <div className="details" style={{color:"black", paddingLeft:20, paddingTop:30}}>{user.map(user=>(
          <div className="address" key={user.id}>
          <p>{user.address}</p>
          <p>{user.city}</p>
          <p>{user.zipcode}</p>
          </div>
        ))}
       </div>
      </div>
      </section>
      <div className="Recipe">
      <div className="wrapper">
        <div className="cards">
          {recipesSaved.slice(0, visible).map(renderCard)}
        </div>
      </div>
      {visible < recipesSaved.length && (
        <button onClick={loadMore} type="button" style={{fontFamily:"Lora"}}className="col-4 btn btn-warning"><Link to="/saved_recipes">View All Saved Recipes</Link></button>
      )}
    </div> 
      <div className="row justify-content-left">
      
      <button type="button" className="col-4 btn btn-warning"><Link to="/order_history">View Order History</Link></button> 
      </div>
      </div>
      </section>
      
      
{/* Attempt #1 for saved recipes */}
{/*       <h3>Saved Recipes</h3>
      <div className="saved recipes">
        {recipes_saved.slice(0, n).map(recipes_saved=>(
          <div className="saved recipe" key={recipes_saved.id}>
        {recipes_saved.recipe_image && <img src={recipes_saved.image}/>}
        <h4>{recipes_saved.recipe_title}</h4>
        </div>
      ))}
      </div>
      <button><Link to="/saved_recipes">View all</Link></button>
      <button><Link to="/order_history">View order history</Link></button> */}

{/* Attempt #2 for saved recipes */}
{/*  <div className="Recipe">
      <div className="wrapper">
        <div className="cards">
          {recipesSaved.slice(0, visible).map(renderCard)}
        </div>
      </div>
      {visible < recipesSaved.length && (
        <button onClick={loadMore}>See All</button>
      )}
    </div>  */}
  
    </div>
  )
}

export default User 
