const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String },
    price: { type: String, required: true },
    done: { type: Boolean, required: true, default: false},
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", schema);
module.exports = Item;