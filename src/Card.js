import React from "react";
import './Card.css';
const Card = ({name}) => {   // meet 4
  const imgsrc=name.Image
  
  console.log(name);
  return (
    <>
      <div className="card">
        <div className="container">

        <div id="value">{name.Value} </div>
       
          <div id="name">{name.Name} </div>

          <div id="image"><img src={imgsrc[name.ImgName]} style={{height: '50px'}}/> </div>
        </div>
          
        </div>
    
      
     
    </>
  );
};

export default Card;
