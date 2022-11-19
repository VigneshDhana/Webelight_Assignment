import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./order.css";
import { useSelector, useDispatch } from "react-redux";
import { signOUT } from "../../actions";
import CreateOrder from "./createOrder";

export default function OrderPage() {
  const currentUser = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const [section, setSection] = useState("");
  const navigate = useNavigate();
  const handleSignOut = () => {
    console.log(currentUser);
    dispatch(signOUT());
    navigate("/");
  };
  useEffect(() => {
    if (currentUser.username) {
      setSection(<CreateOrder setSection={setSection} />);
    } else {
      navigate("/");
    }
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
          <div>
            <p>{currentUser.username}</p>
          </div>
        </div>
      </header>
      {section}
    </>
  );
}
