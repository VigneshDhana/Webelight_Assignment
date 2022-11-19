import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./orderHistory.css";

export default function PastOrder() {
  const currentUser = useSelector((state) => state.isLogged);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate("/");
  };
  useEffect(() => {
    async function getData() {
      const email = currentUser.email;
      const result = await (
        await fetch("http://localhost:5000/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        })
      ).json();
      console.log(result);
      setOrders(result.data);
    }
    getData();
  }, []);
  return (
    <>
      <header>
        <div className="logo">
          <div className="cartlogo">
            <img src="./images/logo.png" alt="" />
          </div>
          <h1>Cart.</h1>
        </div>
        <div className="nav">
          <div onClick={handleSignOut}>
            <p>Sign out</p>
          </div>
          <div
            onClick={() => {
              navigate("/order");
            }}
          >
            <p>New Order</p>
          </div>
          <div>
            <p>UserName</p>
          </div>
        </div>
      </header>{" "}
      <div id="orderHistory">
        <h1>Order History</h1>
        <table>
          <thead>
            <tr>
              <th>Time Stamp</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, i) => {
              return (
                <tr key={i}>
                  <td>
                    <div>
                      <h3>{item.time}</h3>
                    </div>
                  </td>
                  <td>
                    <div>
                      <h3>{item.items}</h3>
                    </div>
                  </td>
                  <td>
                    <div>
                      <h3>Rs.{item.total}</h3>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
