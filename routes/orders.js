var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

// POST the order to be saved by the user
router.post("/", userShouldBeLoggedIn, async (req, res) => {
  let {
    order_cost,
    delivery_cost,
    payment_date,
    delivery_status,
    ordered_ingredients,
  } = req.body;

  await db(
    `INSERT INTO orders (order_cost, delivery_cost, user_id, payment_date,  delivery_status, ordered_ingredients) VALUES ("${order_cost}", "${delivery_cost}", "${req.user_id}", "${payment_date}", "${delivery_status}", "${ordered_ingredients}");`
  );

  res.send({ message: "Order cost added successfully!" });
});

module.exports = router;

// GET paid & not delivered orders from DB
router.get("/", async (req, res) => {
  try {
    let results = await db(
      "SELECT orders.id, orders.order_cost, orders.delivery_cost, orders.payment_date, orders.delivery_status, orders.ordered_ingredients, users.email, users.firstname, users.lastname, users.city, users.zipcode, users.address FROM orders LEFT JOIN users ON orders.user_id = users.id WHERE delivery_status = 0;"
    );
    let orders = results.data;
    res.send(orders);
  } catch (err) {
    res.status(500).send({ error: "err.message" });
  }
});

// GET paid & not delivered orders from DB
router.get("/delivered", async (req, res) => {
  try {
    let results = await db(
      "SELECT orders.id, orders.order_cost, orders.delivery_cost, orders.payment_date, orders.delivery_status, orders.ordered_ingredients, users.email, users.firstname, users.lastname, users.city, users.zipcode, users.address FROM orders LEFT JOIN users ON orders.user_id = users.id WHERE delivery_status = 1;"
    );
    let orders = results.data;
    res.send(orders);
  } catch (err) {
    res.status(500).send({ error: "err.message" });
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await db(`UPDATE orders SET delivery_status=1 WHERE id = ${id};`);
    //let results = await db("SELECT * FROM orders;");
    // let orders = results.data;
    // res.send(orders);
    res.send({ message: "order delivered" });
  } catch (err) {
    res.status(500).send({ error: "err.message" });
  }
});

module.exports = router;
