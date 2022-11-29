var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// POST the recipe to be saved by the user 
router.post('/', async(req,res) => {
    console.log(req.body);

    let {order_cost, delivery_cost, user_id, payment_date, delivery_status, ordered_ingredients} = req.body;
   
    await db(`INSERT INTO orders (order_cost, delivery_cost, user_id, payment_date,  delivery_status, ordered_ingredients) VALUES (${order_cost}, ${delivery_cost}, ${user_id}, ${payment_date}, ${delivery_status}, ${ordered_ingredients}`);
    
    res.send({message: "Order cost added successfully!"});
   });


module.exports = router;
