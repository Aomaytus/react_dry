import React from "react";
import Navber from "./Navber/Navber";

const Index = (props) => {
  return (
    <div>
      <Navber/>
      <p>{props.may}</p>
      
    </div>
  );
};

export default Index;
