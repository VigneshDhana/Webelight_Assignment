import React, { useEffect, useState } from "react";
import "./landing.css";
import SignIn from "./signin";
import Register from "./regster";

function Landing() {
  const [section, setSection] = useState("");
  useEffect(() => {
    setSection(<SignIn setSection={setSection} />);
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
          <div
            onClick={() => {
              setSection(<SignIn setSection={setSection} />);
            }}
          >
            <p>Sign In</p>
          </div>
          <div
            onClick={() => {
              setSection(<Register setSection={setSection} />);
            }}
          >
            <p>Register</p>
          </div>
        </div>
      </header>
      <section>
        <div className="landinghero">
          <img src="./images/landingHero.jpg" alt="Hero" />
        </div>
        {section}
      </section>
    </>
  );
}

export default Landing;
