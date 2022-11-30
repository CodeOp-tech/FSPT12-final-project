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
  //const [visible, setVisible] = useState(4);

   /*  For Attempt #2 saved recipes */
/*   const allRecipesSaved = async () = {
    const {data} = await axios.get("users/recipes_saved")
    setRecipesSaved(response.data.results)
  }

  const loadMore = () => {
    setVisible(visible + 50);
  };

  useEffect(() => {
    allCardData();
  }, []);  */

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

 /*  For Attempt #2 saved recipes */
 /*  const renderCard = (recipes_saved, index) => {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={recipes_saved.image.medium} />
        <Card.Body>
          <Card.Title>
            {recipes_saved.recipe_title}
          </Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }; */
  

  return (
    <div>
{/*       Attempt #1: simple bootstrap card version failed when I tried to pass user info dynamically
      https://codepen.io/mrsahar/pen/jRjmdL */}

{/*           <div className="profile-card-4 text-center"><img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg" className="img img-responsive"/>
        <div className="profile-content"> 
        <div className="profile">

            <div className="profile-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</div>
            <div className="row">
                <div className="col-xs-4">
                    <div className="profile-overview">
                        <p>TWEETS</p>
                        <h4>1300</h4></div>
                </div>
                <div className="col-xs-4">
                    <div className="profile-overview">
                        <p>FOLLOWERS</p>
                        <h4>250</h4></div>
                </div>
                <div className="col-xs-4">
                    <div className="profile-overview">
                        <p>FOLLOWING</p>
                        <h4>168</h4></div>
                </div>
            </div>
        </div>
    </div>  */}

{/*     Attempt #2 with my own bootstrap works with dynamic info being displayed */}

     <section style={{backgroundColor:"yellow", minHeight:800, paddingTop:50, paddingBottom:50, paddingLeft:200, paddingRight:200}}>
      <div style={{background:"white", minHeight:700}}>
      </div>
      </section>
      <div className="profile">
        {user.map(user=>(
          <div className="user" key={user.id}>
          {user.profile_pic && <img src={user.profile_pic}/>}
          <h2>{user.firstname}</h2>
          <h2>{user.lastname}</h2>
          <h2>{user.address}</h2>
          <h2>{user.city}</h2>
          <h2>{user.zipcode}</h2>
          </div>
        ))}
      </div>
 {/*      <div>
      <h3>Saved Recipes</h3>
      <div className="saved recipes" value={recipes}>
        </div>
      </div> */}
      <button><Link to="/saved_recipes">View All Saved Recipes</Link></button>
      <button><Link to="/order_history">View Order History</Link></button> 
      
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
{/* <div className="Recipe">
      <div className="wrapper">
        <div className="cards">
          {recipesSaved.slice(0, visible).map(renderCard)}
        </div>
      </div>
      {visible < recipesSaved.length && (
        <button onClick={loadMore}>See All</button>
      )}
    </div> */}
  
    </div>
  )
}

export default User 
