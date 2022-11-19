import React, { useEffect, useState } from "react";
import Items from "./items";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../actions";
import CreateOrder from "./createOrder";

export default function ViewCart({ setSection, cart }) {
  const currentUser = useSelector((state) => state.isLogged);
  const currentCart = useSelector((state) => state.items);
  const handleBuy = async () => {
    let email = currentUser.email;
    let arr = [];
    let items = 0;
    let total = 0;
    let timestamp = new Date();
    let date = timestamp.toDateString();
    let time = timestamp.toLocaleTimeString();

    currentCart.forEach((item) => {
      if (item !== "") {
        items += item.quantity;
        total += item.quantity * item.price;
        arr.push(item);
      }
    });
    console.log(arr);

    let data = { orderDetails: arr, items, total, time: `${date}(${time})` };
    console.log(data);
    const result = await (
      await fetch("http://localhost:5000/newOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, data }),
      })
    ).json();
    setSection(<CreateOrder setSection={setSection} />);
  };

  return (
    <>
      <section>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>
                  <h1>Name</h1>
                </th>
                <th>
                  <h1>Price</h1>
                </th>
                <th>
                  <h1>Quantity</h1>
                </th>
                <th>
                  <h1>Cost</h1>
                </th>
                <th>
                  <h1>Increment/Decrement</h1>
                </th>
                <th>
                  <h1>Remove</h1>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCart.map((item, i) => {
                if (item.name) {
                  return <Items key={i} item={item} i={i} />;
                }
              })}
            </tbody>
          </table>
          <button
            onClick={() => {
              setSection(<CreateOrder setSection={setSection} />);
            }}
          >
            Go Back
          </button>
          <button onClick={handleBuy}>BUY</button>
        </div>
      </section>
    </>
  );
}
