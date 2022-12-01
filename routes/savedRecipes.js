var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

/* GET saved_recipes page. */

async function getRecipes(user_id) {
  try {
    let recipes = await db(
      `SELECT * from recipes_saved WHERE user_id = ${user_id};`
    );
    return recipes.data;
  } catch (err) {
    return err;
  }
}

// GET saved recipes from the DB table

router.get("/", userShouldBeLoggedIn, async (req, res) => {
  //res.send({ message: 'hello from the backend' });
  const recipes = await getRecipes(req.user_id);
  res.send(recipes);
});

// POST the recipe to be saved by the user
router.post("/", userShouldBeLoggedIn, async (req, res) => {
  console.log(req.body);
  let {
    recipe_ID,
    recipe_image,
    recipe_title,
    recipe_servings,
    recipe_pricePerServing,
    recipe_readyInMinutes,
  } = req.body;

  await db(`INSERT INTO recipes_saved (recipe_ID, user_id, recipe_image, recipe_title,  recipe_servings, recipe_pricePerServing, recipe_readyInMinutes, recipe_orderStatus)
     VALUES ("${recipe_ID}","${req.user_id}", "${recipe_image}", "${recipe_title}", "${recipe_servings}","${recipe_pricePerServing}", "${recipe_readyInMinutes}", "0" );`);

  res.send({ message: "Recipe added successfully!" });
});

router.put("/:recipeID", userShouldBeLoggedIn, async (req, res) => {
  console.log(req.params);
  console.log(req.body.recipe_orderStatus);
  console.log("Recipe to be updated is: ", req.params.recipeID);
  await db(
    `UPDATE recipes_saved SET recipe_orderStatus = "${req.body.recipe_orderStatus}" WHERE recipe_ID = "${req.params.recipeID}" and user_id=${req.user_id};`
  );
  const recipes = await getRecipes(req.user_id);
  res.send(recipes);
});

router.delete("/:recipeID", userShouldBeLoggedIn, async (req, res) => {
  console.log(req.params);
  console.log("Recipe to be deleted is: ", req.params.recipeID);
  await db(
    `DELETE FROM recipes_saved WHERE recipe_ID = ${req.params.recipeID} AND user_id = ${req.user_id};`
  );
  const recipes = await getRecipes(req.user_id);
  res.send(recipes);
});

module.exports = router;
