import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <h1>Profile</h1>
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
        ))}
      </div>
      <h3>Saved Recipes</h3>
      <div className="saved recipes">
        {recipesSaved.map(recipes_saved=>(
          <div className="saved recipe" key={recipes_saved.id}>
        {recipes_saved.recipe_image && <img src="" alt=""/>}
        <h4>{recipes_saved.recipe_title}</h4>
        </div>
      ))}
      </div>
      <button><Link to="/saved_recipes">View all</Link></button>
      <button><Link to="/order_history">View order history</Link></button>
    </div>
  )
}

export default User
