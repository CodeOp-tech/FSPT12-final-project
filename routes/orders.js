var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// POST the recipe to be saved by the user 
router.post('/', async(req,res) => {
    console.log(req.body);
    let {user_id, order_cost} = req.body;
   
    await db(`INSERT INTO orders (user_id, order_cost, delivery_cost, delivery_status) VALUES ("${user_id}", "${order_cost}",'0' ,"0" );`);
    
    res.send({message: "Order cost added successfully!"});
   });


module.exports = router;
