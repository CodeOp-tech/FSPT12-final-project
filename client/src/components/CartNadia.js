import React, {useState, useContext} from 'react';
import { Context } from "../Context";

export default function CartNadia() {

    const {orderedRecipes, setOrderedRecipes} = useContext(Context);

    console.log("these are the orders ", orderedRecipes);


    return (
    <div>Prepare your order here 






    </div>
  )
}
