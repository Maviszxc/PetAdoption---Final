const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  fname: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  message: { type: String, required: true },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
