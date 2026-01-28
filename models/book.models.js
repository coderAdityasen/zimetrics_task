const mongoose = require("mongoose");

// book schema model to store the book
const BookSchema = new mongoose.Schema(
  {
    bookId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
