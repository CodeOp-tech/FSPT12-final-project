import React, {useState} from 'react';



export default function TotalPrice({ setTotal }) {
 
   function addToPrice(e) { 
    e.preventDefault();
    const price = e.target.elements.price.value;
    setTotal(prev => {
        return [...prev, price];
    });
      }

  return (
    
    <form onSubmit={addToPrice}>
      <button type="submit">Add to order</button>
    </form>

  )
}
