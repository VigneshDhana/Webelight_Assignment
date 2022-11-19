require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const customer = require("./models/customer");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/Customers");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  try {
    let user = await customer.find({ email: req.body.email });
    console.log(req.body);
    if (user[0]) {
      res.send({
        message: "User Already Exist",
      });
    } else {
      await customer.create({ ...req.body, data: [] });
      res.send({
        message: "User Created",
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.post("/signin", async (req, res) => {
  try {
    let users = await customer.find({ email: req.body.email });
    if (users[0]) {
      if (users[0]["password"] === req.body.password) {
        res.send(users[0]);
      } else {
        res.send({
          message: "Invalid Password",
        });
      }
    } else {
      res.send({
        message: "Invalid User",
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    let [user] = await customer.find({ email: req.body.email });
    console.log(req.body);
    user["data"] = [req.body.data, ...user.data];
    console.log(user);
    await customer.updateOne({ email: req.body.email }, user);
    res.send({
      message: "Purchase Completed",
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.post("/orders", async (req, res) => {
  try {
    let [user] = await customer.find({ email: req.body.email });
    res.send(user);
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.listen(port, () => console.log(`server running on port ${port}`));
