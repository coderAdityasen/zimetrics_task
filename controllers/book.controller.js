const Book = require("../models/book.models.js");

// ADD BOOK
exports.addbook = async (req, res) => {
  try {
    const { bookId, title, author, year } = req.body;

    // check all the fields are exist or not
    if (!bookId || !title || !author || !year) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // if it exist then respond with message
    const exists = await Book.findOne({ bookId });
    if (exists) {
      return res.status(400).json({ error: "Book ID already exists" });
    }

    // if not create this new book in the database
    const newBook = await Book.create({
      bookId,
      title,
      author,
      year,
    });

    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getbook = async (req, res) => {
  try {
    // take the book id from url to search
    const bookId = Number(req.params.id);

    // find that book from database
    const book = await Book.findOne({ bookId });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchBooksByYear = async (req, res) => {
  try {
    // take the year from the url with query and search that book
    const year = Number(req.query.year);

    if (!year) {
      return res
        .status(400)
        .json({ error: "Year query parameter is required" });
    }

    const books = await Book.find({ year });

    res.json({
      count: books.length,
      books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    // take book id from the url and search that book and delete
    const bookId = Number(req.params.id);

    const deletedBook = await Book.findOneAndDelete({ bookId });

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
