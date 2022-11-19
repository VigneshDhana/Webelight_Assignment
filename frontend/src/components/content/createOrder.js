import React, { useEffect, useState } from "react";
import Card from "./card";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../actions";
import { useNavigate } from "react-router-dom";
import ViewCart from "./cart";

export default function CreateOrder({ setSection }) {
  const currentCart = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [itemCount, setItemCount] = useState([0, 0]);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const search = (e) => {
    e.preventDefault();
    let value = document.getElementById("search").value;
    let arr = data;
    arr = arr.filter((x) => {
      if (x.name === value) {
        return x;
      }
    });
    setProducts(arr);
  };
  const filter = (e) => {
    e.preventDefault();
    let arr = data;
    arr.sort((a, b) => {
      let ar = [a.name, b.name];
      ar.sort();
      if (ar[0] === a.name) {
        return -1;
      } else {
        return 1;
      }
    });
    let category = document.getElementById("category").value;
    let range = document.getElementById("range").value;
    if (category != "all") {
      arr = arr.filter((x) => {
        if (x.category === category) {
          return x;
        }
      });
    }
    if (range != "all") {
      if (range === "dec") {
        arr.sort((a, b) => b.price - a.price);
      } else if (range === "inc") {
        arr.sort((a, b) => a.price - b.price);
      } else {
        let limit = range.split(" ").map((x) => parseInt(x));
        arr = arr.filter((x) => {
          if (x.price > limit[0] && x.price <= limit[1]) {
            return x;
          }
        });
      }
    }
    setProducts(arr);
  };
  const addItem = (item) => {
    let products = currentCart;
    let arr = cart;
    let status = true;
    arr = arr.map((x) => {
      if (item.id === x.id) {
        x.quantity += 1;
        status = false;
      }
      return x;
    });
    if (status) {
      item.quantity = 1;
      arr.push(item);
    }
    setItemCount([itemCount[0] + 1, itemCount[1] + item.price]);
    dispatch(updateCart(arr));
    setCart(arr);
  };
  useEffect(() => {
    async function getData() {
      let data = await (await fetch("./products/products.json")).json();
      data.sort((a, b) => {
        let arr = [a.name, b.name];
        arr.sort();
        if (arr[0] === a.name) {
          return -1;
        } else {
          return 1;
        }
      });
      setData(data);
      setProducts(data);
    }
    getData();
  }, []);
  return (
    <>
      <section>
        <aside className="leftAside">
          <div className="search">
            <input type="text" id="search" />
            <br />
            <button onClick={search}>search</button>
          </div>
          <div className="filter">
            <br />
            <label htmlFor="Category">Category : </label>
            <br />
            <select name="category" id="category">
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furnitures</option>
              <option value="kitchenAccessories">Kitchen Accesories</option>
              <option value="toys">Toys</option>
            </select>
            <br />
            <br />
            <label htmlFor="Category">Price Range : </label>
            <br />
            <select name="range" id="range">
              <option value="all">All</option>
              <option value="dec">High to low</option>
              <option value="inc">Low to high</option>
              <option value="0 1000">Less than 1000</option>
              <option value="1000 2000">1000 - 2000</option>
              <option value="2000 5000">2000 - 5000</option>
              <option value="5000 50000">Greater than 5000 </option>
            </select>
            <br />
            <br />
            <button onClick={filter}>Filter</button>
          </div>
        </aside>
        <div className="content">
          <div className="products">
            {products.map((item, i) => (
              <Card key={i} item={item} addItem={addItem} />
            ))}
          </div>
        </div>
        <aside className="rightAside">
          <div className="cartAndCheckout">
            <button
              onClick={() => {
                console.log(cart);
                setSection(<ViewCart setSection={setSection} />);
              }}
            >
              View Cart {itemCount ? `(${itemCount[0]})` : ""}
            </button>
            <br />
            <h2>Total : Rs.{itemCount[1]}</h2>
          </div>
          <div className="orders">
            <button onClick={() => navigate("/orderHistory")}>Orders</button>
          </div>
        </aside>
      </section>
    </>
  );
}
