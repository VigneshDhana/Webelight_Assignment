import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIN } from "../../actions";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const currentUser = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    async function getData() {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      const result = await (
        await fetch("http://localhost:5000/signin", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
      ).json();
      if (result["email"] === email) {
        dispatch(signIN(result));
        console.log(result);
        navigate("/order");
      } else {
        alert(result.message);
      }
    }
    getData();
  };
  return (
    <>
      <div className="signinReg">
        <label htmlFor="userID">Email : </label>
        <br />
        <input type="text" id="email" />
        <br />
        <br />
        <label htmlFor="pasword">Password : </label>
        <br />
        <input type="password" id="password" />
        <br />
        <br />
        <button onClick={(e) => handleSignIn(e)}>Sign In</button>
        <br />
      </div>
    </>
  );
}
