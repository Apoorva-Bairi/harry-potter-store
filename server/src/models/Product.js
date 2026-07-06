const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Wands", "Robes", "Mugs", "Scarves", "Books", "Accessories"],
    },
    house: {
      type: String,
      enum: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff", "All"],
      default: "All",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    rating: Number,
    comment: String,
  },
],

numReviews: {
  type: Number,
  default: 0,
},

averageRating: {
  type: Number,
  default: 0,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);