import React from "react";
import "./card.css";

export default function Card({ item, i, addItem }) {
  return (
    <div className="cards">
      <h3>{item.name}</h3>
      <div className="cardImg">
        <img src={item.image} alt="" />
      </div>
      <div className="cardDetails">
        <p>Rs. {item.price}</p>
        <button
          onClick={() => {
            addItem(item);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
