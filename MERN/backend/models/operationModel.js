const { Schema, model } = require("../connection");

const mySchema = new Schema({
  name: { type: String },
  time: { type: Number},
  description: { type: String},
  stack : String,
  created_at: Date,
});

module.exports = model("operation", mySchema );
