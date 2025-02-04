const Book = require("../models/book");
class RepositoryBook {
  async post(title, author, category, pages, price, language) {
    try {
      if (!title) {
        throw new Error("Title cannot be null.");
      } else if (!author) {
        throw new Error("Author cannot be null.");
      } else if (!category) {
        throw new Error("Category cannot be null.");
      } else if (!pages) {
        throw new Error("Pages cannot be null.");
      } else if (!price) {
        throw new Error("Price cannot be null.");
      } else if (!language) {
        throw new Error("Language cannot be null.");
      }
      const newBook = await Book.create(
        title,
        author,
        category,
        pages,
        price,
        language
      );
      if (!newBook) {
        throw new Error("Book could not be created.");
      }
      return newBook;
    } catch (error) {
      console.error("Error creating Book:", error);
      throw error;
    }
  }
  async get(id) {
    try {
      const BookData = await Book.findById(id);
      if (!BookData) {
        throw new Error("Book not exists.");
      }
      return BookData;
    } catch (error) {
      console.error("Error get Book:", error);
      throw error;
    }
  }
  async getAll() {
    try {
      const BookData = await Book.getAll();
      return BookData;
    } catch (error) {
      console.error("Error get Book:", error);
      throw error;
    }
  }
  async put(id, title, author, category, pages, price, language) {
    try {
      if (!title) {
        throw new Error("Title cannot be null.");
      } else if (!author) {
        throw new Error("Author cannot be null.");
      } else if (!category) {
        throw new Error("Category cannot be null.");
      } else if (!pages) {
        throw new Error("Pages cannot be null.");
      } else if (!price) {
        throw new Error("Price cannot be null.");
      } else if (!language) {
        throw new Error("Language cannot be null.");
      }
      const newBook = await Book.update(
        id,
        title,
        author,
        category,
        pages,
        price,
        language
      );
      return newBook;
    } catch (error) {
      console.error("Error creating Book:", error);
      throw error;
    }
  }
  async delete(id) {
    try {
      const BookData = await Book.delete(id);
      if (!BookData) {
        throw new Error("Book not exists.");
      }
      return BookData;
    } catch (error) {
      console.error("Error get Book:", error);
      throw error;
    }
  }
}

module.exports = RepositoryBook;
