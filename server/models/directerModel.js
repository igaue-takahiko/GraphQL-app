const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const directerSchema = new Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Directer", directerSchema);
