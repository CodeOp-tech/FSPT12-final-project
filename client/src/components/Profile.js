import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../profile.css";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

const User = () => {
  const [user, setUser] = useState([])
  const [recipesSaved, setRecipesSaved] = useState([])

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


  return (
    <div>
{/*       Attempt #1: simple bootstrap card version failed when I tried to pass user info dynamically
      https://codepen.io/mrsahar/pen/jRjmdL */}

{/*           <div className="profile-card-4 text-center"><img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg" className="img img-responsive"/>
        <div className="profile-content"> 
        <div className="profile">
        {user.map(user=>(
          <div className="user" key={user.id}>
          {user.profile_pic && <img src="" alt="" />}
          <h2>{user.firstname}</h2>
          <h2>{user.lastname}</h2>
          <h2>{user.address}</h2>
          <h2>{user.city}</h2>
          <h2>{user.zipcode}</h2>
          </div>
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
    </div> */}

{/*     Attempt #2 with my own bootstrap works with dynamic info being displayed */}

     <section style={{backgroundColor:"yellow", minHeight:800, paddingTop:50, paddingBottom:50}}>
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
      <button><Link to="/saved_recipes">Saved Recipes</Link></button>
      <button><Link to="/order_history">View Order History</Link></button> 

{/*       <h3>Saved Recipes</h3>
      <div className="saved recipes">
        {recipesSaved.map(recipes_saved=>(
          <div className="saved recipe" key={recipes_saved.id}>
        {recipes_saved.recipe_image && <img src="" alt=""/>}
        <h4>{recipes_saved.recipe_title}</h4>
        </div>
      ))}
      </div>
      <button><Link to="/saved_recipes">View all</Link></button>
      <button><Link to="/order_history">View order history</Link></button> */}
    </div>
  )
}

export default User 
