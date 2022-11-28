import React from "react";
import { Context } from "../Context";
import {useContext} from 'react';

export default function OrderDashA() {
  //visible for the admin only

  /*data structure:
  `orders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_cost` DECIMAL(8, 2) NOT NULL,
    `delivery_cost` DECIMAL(8, 2) NOT NULL,
    `user_id` INT NOT NULL,
    `payment_date` DATETIME NOT NULL,
    `delivery_status` TINYINT(1) NOT NULL,
    `recipe_ids` VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);*/

  return (
    <div>
      <h1 className="ml-2">Orders to be Delivered</h1>
      <table className="table table-hover table-secondary">
        <thead>
          <tr>
            {/* <th scope="col">Delete</th> */}
            <th scope="col">Name</th>
            <th scope="col">Recipes Ordered</th>
            <th scope="col">Price of Ingredients</th>
            <th scope="col">Delivery Cost</th>
            <th scope="col">Price in Total</th>
            <th scope="col">Payment Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User's full name</td>
            <td>Recipe ids</td>
            <td>29$</td>
            <td>10$</td>
            <td>39$</td>
            <td>2022-11-27</td>
            <td>
              <button
                className="btn btn-success btn-sm"
                /* onClick={() => taskInvoiced(task.id)} */
              >
                Deliver Order
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <h1 className="ml-2">Delivered Orders</h1>
      <table className="table table-hover table-secondary">
        <thead>
          <tr>
            {/* <th scope="col">Delete</th> */}
            <th scope="col">Name</th>
            <th scope="col">Recipes Ordered</th>
            <th scope="col">Price of Ingredients</th>
            <th scope="col">Delivery Cost</th>
            <th scope="col">Price in Total</th>
            <th scope="col">Payment Date</th>
            <th scope="col">Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User's full name</td>
            <td>Recipe ids</td>
            <td>29$</td>
            <td>10$</td>
            <td>39$</td>
            <td>2022-11-27</td>
            <td>2022-11-30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
