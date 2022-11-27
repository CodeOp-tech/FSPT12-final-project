import React, {useState} from 'react'
import "./Ingredient.css";

// Adapted from here:
 // https://codesandbox.io/s/wild-silence-b8k2j?file=/src/App.js

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function Ingredient({ingredients, servings}) {
  
    const [serving, setServings] = useState(servings);

    const [checkedState, setCheckedState] = useState(
    new Array(ingredients.length).fill(false)
  );

  const [total, setTotal] = useState(0);
  

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + ingredients[index].price*(serving/servings)/100;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };  
  
  function handleServings(e) {
    setServings(e.target.value);
  }
  
// , amount.us.value, amount.us.unit 
  return (
    <div className="App">
    <div className="toppings-list-item">
      <h4 className="left-section">Select ingredients</h4>
      <input type="text" onChange={(e)=>handleServings(e)} value={serving} />
      <h4 className="right-section">Servings {serving}</h4>
      </div>
      <ul className="toppings-list">
        {ingredients.map(({ name, price}, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                <div className="right-section">{getFormattedPrice((price*serving/servings)/100)}</div>
                
              </div>
            </li>
          );
        })}
        <li>
          <div className="toppings-list-item">
            <div className="left-section">Total price of the recipe:</div>
            <div className="right-section" id="price">{getFormattedPrice(total)}</div>

           </div>          
         
        </li>
      </ul>
    </div>
  );
}
