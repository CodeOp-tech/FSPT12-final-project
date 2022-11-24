var express = require('express');
var router = express.Router();
const db = require("../model/helper");


/* GET ingredients for the selected recipe. */

async function getIngredients(recipe_id) {
    try {
        let ingredients = await db(`SELECT * from ingredients WHERE recipe_ID="${recipe_id}";`);
        return ingredients.data;
    } catch (err) {
        return err;
    }
};

// GET recipe-related ingredients info from the DB ingredients table

router.get('/:recipe_id', async (req, res) => {
 const ingredients = await getIngredients(req.params.recipe_id);
 res.send(ingredients);
});


 // POST the ingredients info when user adds the recipe to cart 
 router.post('/', async(req,res) => {
    console.log(req.body);
    let {recipe_ID, ingredient_info } = req.body;
     console.log(ingredient_info);
    await db(`INSERT INTO ingredients (recipe_ID, ingredient_info)
     VALUES ("${recipe_ID}","${ingredient_info}");`);
    
    res.send({message: "Ingredients added successfully!"});
   });

module.exports = router;
