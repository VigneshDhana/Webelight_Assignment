import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Landing from "./components/signinReg/landing";
import OrderPage from "./components/content/order";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { signIN, signOUT } from "./actions";
import { useState } from "react";
import ViewCart from "./components/content/cart";
import PastOrder from "./components/content/pastorder";

function App() {
  const currentUser = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/orderHistory" element={<PastOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
