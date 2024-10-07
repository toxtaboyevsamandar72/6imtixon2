import React from "react";
import './card.css'


function Card({ title, thumbnailUrl }) {
  return (
    <div className="card">
      <h3 className="h3">{title}</h3>
      <img className="images" src={thumbnailUrl}  />
    </div>
  );
}

export default Card;
