import React from "react";
import "./items.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../actions";

export default function Items({ item, i }) {
  const [trigger, setTrigger] = useState(true);
  const currentCart = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const updateItem = (item, value) => {
    console.log(value);
    let arr = currentCart;
    if (value === 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === item.id && i < arr.length - 1) {
          [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
        }
      }
      arr[arr.length - 1] = "";
      dispatch(updateCart(arr));
      setTrigger(false);
    } else {
      arr = arr.map((x) => {
        if (item.id === x.id && x.quantity) {
          x.quantity += value;
        }
        return x;
      });
      dispatch(updateCart(arr));
    }
    console.log(arr);
  };
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [quantity, setQuantity] = useState("");
  let [cost, setCost] = useState("");
  useEffect(() => {
    setName(item.name);
    setPrice(item.price);
    setQuantity(item.quantity);
    setCost(item.price * item.quantity);
  }, []);
  useEffect(() => {
    setCost(price * quantity);
  }, [price, quantity]);
  return trigger ? (
    <tr id={name}>
      <td>
        <h1>{name}</h1>
      </td>
      <td>
        <h3>Rs. {price}</h3>
      </td>
      <td>
        <h3>{quantity}</h3>
      </td>
      <td>
        <h3>Rs. {cost}</h3>
      </td>
      <td>
        <button
          onClick={() => {
            updateItem(item, 1);
            setQuantity(quantity + 1);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            updateItem(item, -1);
            if (quantity) setQuantity(quantity - 1);
          }}
        >
          -
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            updateItem(item, 0);
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  ) : (
    ""
  );
}
