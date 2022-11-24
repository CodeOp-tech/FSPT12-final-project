var express = require('express');
var router = express.Router();
const db = require("../model/helper");


/* GET orders  */

// async function getIngredients(id) {
//     try {
//         let ingredients = await db(`SELECT * from ingredients where recipe_ID="${id}";`);
//         return ingredients.data;
//     } catch (err) {
//         return err;
//     }
// };

// // GET ingredients for recipe ID from the DB table

// router.get('/:recipeID', async (req, res) => {
//  const ingredients = await getIngredients(req.params.recipeID);
//  res.send(ingredients);
// });

module.exports = router;
