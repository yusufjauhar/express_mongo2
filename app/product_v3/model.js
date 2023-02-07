const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "kolom nama harus ada"],
    minlength: 1,
    maxlength: 40,
  },
  price: {
    type: Number,
    required: true,
    min: 1000,
    max: 100000000,
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true,
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
