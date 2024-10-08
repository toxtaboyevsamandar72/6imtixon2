import React from "react";
import './Card.css';

function Card({ title, thumbnailUrl, authors, categories }) {
  return (
    <div className="card">
      <h3 className="h3">{title}</h3>
      <img className="images" src={thumbnailUrl}  />
      <p>Authors: {authors.join(", ")}</p>
      <p>Categories: {categories.join(", ")}</p>
    </div>
  );
}

export default Card;
