const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  data: Array,
});

const customer = mongoose.model("customer", customerSchema);

module.exports = customer;
