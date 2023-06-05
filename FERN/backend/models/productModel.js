const { Schema, model } = require("../connection");

const mySchema = new Schema({
  title: { type: String },
  category: { type: String},
  price: { type: Number},
  image : String,
  created_at: Date,
});

module.exports = model("product", mySchema );
