import React from "react";
import ingredientsImage from "../images/ingredients.jpeg";
import { MDBContainer } from "mdb-react-ui-kit";

export default function Home() {
  return (
    <MDBContainer>
      <img src={ingredientsImage} className="img-fluid shadow-4 pt-5" />
    </MDBContainer>
  );
}
