import React from "react";
import SignIn from "./signin";

export default function Register({ setSection }) {
  const handleRegister = (e) => {
    e.preventDefault();
    async function getData() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let confirmpassword = document.getElementById("confirmpassword").value;
      let email = document.getElementById("email").value;
      if (password === confirmpassword) {
        const result = await (
          await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, email }),
          })
        ).json();
        if (result["message"] === "User Created") {
          setSection(<SignIn />);
        } else {
          alert(result["message"]);
        }
      } else {
        alert("Password and Confirm password are not matching");
      }
    }
    getData();
  };
  return (
    <>
      <div className="signinReg">
        <label htmlFor="userID">User name : </label>
        <br />
        <input type="text" id="username" />
        <br />
        <br />
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
        <label htmlFor="pasword">Confirm password : </label>
        <br />
        <input type="text" id="confirmpassword" />
        <br />
        <br />
        <button
          onClick={(e) => {
            handleRegister(e);
          }}
        >
          Register
        </button>
        <br />
      </div>
    </>
  );
}
