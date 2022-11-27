import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
	const [orderedIngredients, setOrderedIngredients] = useState([]);

	return (
		<Context.Provider value={{ orderedIngredients, setOrderedIngredients }}>
			{children}
		</Context.Provider>
	);
};
