const express = require("express");
const router = express.Router();

const {
  addbook,
  getbook,
  searchBooksByYear,
  deleteBook,
} = require("../controllers/book.controller.js");

// add book api
router.post("/books", addbook);

// search book by year from url by search year in params
router.get("/books/search", searchBooksByYear);

// get the book by visiting the book ID
router.get("/books/:id", getbook);

// delete the book by its ID
router.delete("/books/:id", deleteBook);

module.exports = router;
