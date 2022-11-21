var express = require('express');
var router = express.Router();
const db = require("../model/helper");


/* GET saved_recipes page. */

async function getRecipes() {
    try {
        let recipes = await db("SELECT * from recipes_saved;");
        return recipes.data;
    } catch (err) {
        return err;
    }
};

// GET saved recipes from the DB table

router.get('/', async (req, res) => {
  //res.send({ message: 'hello from the backend' });
 const recipes = await getRecipes();
 res.send(recipes);
});


 // POST the recipe to be saved by the user 
 router.post('/', async(req,res) => {
    console.log(req.body);
    let {recipe_ID, user_id, recipe_image, recipe_title, recipe_summary} = req.body;
   
    await db(`INSERT INTO recipes_saved (recipe_ID, user_id, recipe_image, recipe_title, recipe_summary) VALUES ("${recipe_ID}","${user_id}", "${recipe_image}", "${recipe_title}", "${recipe_summary}");`);
    
    res.send({message: "Recipe added successfully!"});
   })  

module.exports = router;
