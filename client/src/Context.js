import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
	const [orderedRecipes, setOrderedRecipes] = useState([]);

	return (
		<Context.Provider value={{ orderedRecipes, setOrderedRecipes }}>
			{children}
		</Context.Provider>
	);
};
